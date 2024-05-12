// Naimportování všech balíčků
require('dotenv').config({ path: '../../.env'  });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Inicializace aplikace Express
const app = express();
const PORT = process.env.PORT || 3001; // Nastavení portu serveru

// Tajný klíč pro JWT
const jwtSecret = process.env.JWT_SECRET;


// Middleware pro povolení CORS a parsování JSON těla
app.use(cors());
app.use(bodyParser.json());


// Připojení k MongoDB pomocí řetězce připojení
mongoose.connect('mongodb+srv://admin:admin@mojebrigadadb.3up8vxj.mongodb.net/mojeBrigadaDB')
  .then(() => console.log('Připojeno k databázi MongoDB'))
  .catch(err => console.error('Připojení k databázi MongoDB se nezdařilo', err));

//Schéma objektu uživatele 
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  surname: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  birthDate: {
    type: Date,
    required: true
  },
  privilegeLevel: {
    type: String,
    enum: ["SuperAdmin", "Admin", "User"],
    default: "User"
  } 
});

//Schéma objektu směny 
const shiftSchema = new mongoose.Schema({
  startTime: String,
  endTime: String,
  capacity: Number,
  assignedTo: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    required: false
  }
});

//Schéma objektu zprávy 
const messageSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  headline: String,
  content: String
})

//Schéma objektu týdne 
const weekSchema = new mongoose.Schema({
  weekNumber: Number,
  startDate: Date,
  monday: {
    dayDate: Date,
    shifts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shift',
    }]
  },
  tuesday: {
    dayDate: Date,
    shifts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shift',
    }]
  },
  wednesday: {
    dayDate: Date,
    shifts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shift',
    }]
  },
  thursday: {
    dayDate: Date,
    shifts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shift',
    }]
  },
  friday: {
    dayDate: Date,
    shifts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shift',
    }]
  },
  saturday: {
    dayDate: Date,
    shifts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shift',
    }]
  },
  sunday: {
    dayDate: Date,
    shifts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shift',
    }]
  },
})

//Schéma objektu šablony 
const templateSchema = new mongoose.Schema({
  templateName: String,
  monday: {
    shifts: [{
      startTime: String,
      endTime: String,
      capacity: Number
    }]
  },
  tuesday: {
    shifts: [{
      startTime: String,
      endTime: String,
      capacity: Number
    }]
  },
  wednesday: {
    shifts: [{
      startTime: String,
      endTime: String,
      capacity: Number
    }]
  },
  thursday: {
    shifts: [{
      startTime: String,
      endTime: String,
      capacity: Number
    }]
  },
  friday: {
    shifts: [{
      startTime: String,
      endTime: String,
      capacity: Number
    }]
  },
  saturday: {
    shifts: [{
      startTime: String,
      endTime: String,
      capacity: Number
    }]
  },
  sunday: {
    shifts: [{
      startTime: String,
      endTime: String,
      capacity: Number
    }]    
  },
})

// přidání dvou hodin do času zprávy (UTC čas)
messageSchema.pre('save', function(next) {
  this.createdAt.setHours(this.createdAt.getHours() + 2);
  next();
});

//Funkce Autentikace tokenu
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (token == null) return res.sendStatus(401); 

  jwt.verify(token, jwtSecret, (err, user) => {
      if (err) return res.sendStatus(403); 
      req.user = user;
      next();
  });
};

//Funkce Autentikace tokenu správce
const authenticateAdminToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (token == null) return res.sendStatus(401); 

  jwt.verify(token, jwtSecret, (err, user) => {
      if (err) return res.sendStatus(403); 
      if (user.privilegeLevel != "Admin") {
        return res.status(401).send("Unauthorized");
      }
      req.user = user;
      next();
  });
};

//Endpoint přihlášení
app.post('/api/Login', async (req, res) => {
  console.log("JWT Secret:", jwtSecret);
  try {
    console.log(req)
    const formEmail = req.body.email;
    console.log(formEmail)
    const formPass = req.body.password;

    // podle zadaného emailu se najde daný uživatel
    const user = await User.findOne({ email: formEmail });


    console.log(user);
    
    if (user) {
      const comparePass = await bcrypt.compare(formPass, user.password); //pomocí bcrypt se porovnají zahashované hesla
      if (comparePass) {
        const token = jwt.sign(
          { userId: user._id, name: user.name, surname: user.surname, privilegeLevel: user.privilegeLevel }, // vytvoří se JWT Token s expirací 1h
          process.env.JWT_SECRET,
          { expiresIn: '1h' })

        return res.status(200).json({ message: "Login successful", token });
      }
    }

    return res.status(401).send("Invalid credentials");
    
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).send("Server Error: " + error.message);
  }

});

// TÝDNY

async function createNewWeek() { // funkce vytvoření nového týdnu v řadě
  try {

    let latestWeek = await Week.findOne().sort({ startDate: -1 });
    if (!latestWeek) {
      console.error('No latest week found.');
      return null; 
    }

    const date = new Date(latestWeek.startDate);
    const existingWeek = await Week.findOne({ weekNumber: latestWeek.weekNumber + 1 });

    if (existingWeek) {
      console.log('Week  already exists.');
      return;
    }


    date.setDate(date.getDate() + 7);

    const tuesdayDate = new Date(date);
    const wednesdayDate = new Date(date);
    const thursdayDate = new Date(date);
    const fridayDate = new Date(date);
    const saturdayDate = new Date(date);
    const sundayDate = new Date(date);

    tuesdayDate.setDate(tuesdayDate.getDate() + 1);
    wednesdayDate.setDate(wednesdayDate.getDate() + 2);
    thursdayDate.setDate(thursdayDate.getDate() + 3);
    fridayDate.setDate(fridayDate.getDate() + 4);
    saturdayDate.setDate(saturdayDate.getDate() + 5);
    sundayDate.setDate(sundayDate.getDate() + 6);


    const week = new Week({
      weekNumber: latestWeek.weekNumber + 1,
      startDate: date,
      monday: { dayDate: date, shifts: []},
      tuesday: { dayDate: tuesdayDate, shifts: [] },
      wednesday: { dayDate: wednesdayDate, shifts: []},
      thursday: { dayDate: thursdayDate, shifts: []},
      friday: { dayDate: fridayDate, shifts: []},
      saturday: { dayDate: saturdayDate,shifts: [] },
      sunday: { dayDate: sundayDate,shifts: [] } 
    })

      await week.save();
      console.log(week);
      return week;
    } catch (error) {
      console.error("Failed to create new week:", error);
      return res.status(500).send("Failed to create new week");
    }
}

const Week = mongoose.model('Week', weekSchema);

//Endpoint získání týdnů
app.get('/api/Weeks', authenticateToken, async (req, res) => {

  try {
    const weekNumber = req.query.weekNumber;

    // Zkontrolujeme zda číslo není null
    if (!weekNumber) {
      return res.status(400).send('Week number is required');
    }

    // hledáme týden podle čísla týdnu
    const weeks = await Week.findOne({ weekNumber }).populate({
      path: 'monday.shifts tuesday.shifts wednesday.shifts thursday.shifts friday.shifts saturday.shifts sunday.shifts',
      populate: { path: 'assignedTo', select: 'name surname' }
      });

    // pokud týden není nalezen, vytvoří se
    if (!weeks) {
      const newWeek = await createNewWeek();
      if (newWeek) {
        res.status(201).json(newWeek);
      } else {
        res.status(404).send('Failed to create new week');
      }
    }
    console.log(weeks);
    res.send(weeks);
  } catch (error) {
    console.error('Error accessing /api/Weeks:', error);
    res.status(500).send('Server error occurred while creating new week');
  }
});

//Endpoint patchnutí týdnů
app.patch('/api/Weeks/:id', async (req, res) => {
  try {
    const {id} = req.params; 
    const updatedData = req.body;
    

    let week = await Week.findOne({ _id: id });

    if (week) {
      Object.assign(week, updatedData)
      await week.save()
      res.status(200).send(week)
    } else {
      return res.status(404).send("Week was not found.")
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

//Endpoint patchnutí týdnů podle data
app.patch('/api/Weeks/byDate/:startDate', async (req, res) => {
  try {
    const startDate = req.params.startDate; 
    const updatedData = req.body;
    

    let week = await Week.findOne({ startDate: startDate });

    if (week) {
      Object.assign(week, updatedData)
      await week.save()
      res.status(200).send(week)
    } else {
      return res.status(404).send("Week was not found.")
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

//Endpoint získání čísla aktuálního týdne
app.get('/api/WeeksCurrent', authenticateToken, async (req, res) => {
  try {
    const currentDate = new Date();
    const startOfWeek = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay() + 1, // +1 adjusts for Monday as the first day of the week
    );


    const startOfDay = new Date(Date.UTC(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate(), 0, 0, 0));
    const endOfDay = new Date(Date.UTC(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate(), 23, 59, 59));


    const week = await Week.findOne({
      startDate: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    if (week) {
      res.json(week.weekNumber);
    } else {
      res.json({ message: 'No week found for current date' });
    }
  } catch (error) {
    console.error("Error fetching current week:", error);
    res.status(500).send('Server Error');
  }
});

//Endpoint zveřejnění týdnů
app.post('/api/Weeks', authenticateAdminToken,async (req, res) => {
  try {
    createNewWeek();
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

//TEMPLATE

const Template = mongoose.model('Template', templateSchema);

//Endpoint získání šablon
app.get('/api/Templates', authenticateToken, async (req, res) => {
  const template = await Template.find();
  console.log(template);
  res.send(template);
});

//SMĚNY


const Shift = mongoose.model('Shift', shiftSchema);

//Endpoint získání směn
app.get('/api/Shifts', authenticateToken, async (req, res) => {
  const shifts = await Shift.find();
  console.log(shifts)
  res.send(shifts);
});

//Endpoint zveřejnění směn
app.post('/api/Shifts', authenticateAdminToken, async (req, res) => {
 
  try {
    let shift = new Shift({
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      capacity: req.body.capacity,
      assignedTo: req.body.assignedTo
    })
    await shift.save();
    console.log(shift);
    res.send(shift);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

//Endpoint patchnutí směn
app.patch('/api/Shifts/:id', async (req, res) => {
  try {
    const {id} = req.params; 
    const updatedData = req.body;

    let shift = await Shift.findOne({ _id: id });

    if (shift) {
      Object.assign(shift, updatedData)
      await shift.save()
      res.status(200).send(shift)
    } else {
      return res.status(404).send("Shift was not found.")
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




//UŽIVATELÉ


const User = mongoose.model('User', userSchema);

//Endpoint získání uživatelů
app.get('/api/Users', authenticateToken, async (req, res) => {
  const users = await User.find();
  console.log(users);
  res.send(users);
});

//Endpoint získání uživatelů podle ID
app.get('/api/Users/:userId', authenticateToken, async (req, res) => {
  const userId = req.params.userId; 
  try {
      const user = await User.findById(userId); // Find the user by ID
      if (user) {
          res.send(user);
      } else {
          res.status(404).send({ message: "User not found" });
      }
  } catch (error) {
      console.error("Error finding user:", error);
      res.status(500).send({ message: "Server error" });
  }})

  //Endpoint zveřejnění uživatelů
app.post('/api/Users', authenticateAdminToken, async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    console.log(user)
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      var dateFormated = new Date(req.body.birthDate);


      user = new User({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
        createdAt: req.body.createdAt || Date.now(),
        birthDate: dateFormated,
        privilegeLevel: req.body.privilegeLevel || "User"
      });
    } else {

      user.name = req.body.name || user.name;
      user.surname = req.body.surname || user.surname;
      user.birthDate = dateFormated || user.birthDate;
      user.privilegeLevel = req.body.privilegeLevel || user.privilegeLevel;

      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
      }
    }

    await user.save();
    console.log(user);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

//Endpoint patchnutí uživatelů
app.patch('/api/Users/:id', authenticateAdminToken, async (req, res) => {
  try {
    const {id} = req.params; 
    const updatedData = req.body;
    

    let user = await User.findOne({ _id: id });

    if (user) {
      Object.assign(user, updatedData)
      await user.save()
      res.status(200).send(user)
    } else {
      return res.status(404).send("User was not found.")
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//Endpoint smazání uživatelů
app.delete('/api/Users/:id', authenticateAdminToken, async (req, res) => {
  try {
    console.log("Were in to delete.");
    let user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send("User was not found.")
    }
    console.log(user)
    res.status(200).send();


    } catch (error) { 
      console.error(error);
      res.status(500).send("Error deleting user")
    }
  });

//Zprávy


const Message = mongoose.model('Message', messageSchema);

//Endpoint získání zpráv
app.get('/api/Messages', authenticateToken, async (req, res) => {
  console.log("we have reached messages")
  try {
    const messages = await Message.find()
                                  .populate('createdBy', 'name surname')
                                  .exec();
    console.log(messages)
    const formatedMessages = messages.map(message => {
      const messageObject = message.toObject(); 
      if (messageObject.createdBy) {
        messageObject.userName = messageObject.createdBy.name;
        messageObject.userSurname = messageObject.createdBy.surname;
        messageObject.createdBy = message.createdBy._id;
      }
      return messageObject;
    });

    console.log(formatedMessages);
    res.send(formatedMessages);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred fetching messages.");
  }
});


//Endpoint zveřejnění zpráv
app.post('/api/Messages', authenticateToken, async (req, res) => {
    let message = new Message({
      createdAt: Date.now(),
      createdBy: req.body.createdBy,
      headline: req.body.headline,
      content: req.body.content
    })

    await message.save();
    console.log(message)
    res.send(message);
  });

// Spuštění serveru na zadaném portu
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


