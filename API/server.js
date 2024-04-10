const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');



const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());



mongoose.connect('mongodb+srv://admin:admin@mojebrigadadb.3up8vxj.mongodb.net/mojeBrigadaDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Připojeno k databázi MongoDB'))
  .catch(err => console.error('Připojení k databázi MongoDB se nezdařilo', err));


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


const shiftSchema = new mongoose.Schema({
  startTime: String,
  endTime: String,
  assignedTo: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    required: false
  }
});

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

const templateSchema = new mongoose.Schema({
  templateName: String,
  monday: {
    shifts: [{
        shiftOne: {
          date: Date,
          startTime: String,
          endTime: String,
        }
    }]
  },
  tuesday: {
    shifts: [{
        shiftOne: {
          startTime: String,
          endTime: String,
        }
    }]
  },
  wednesday: {
    shifts: [{
        shiftOne: {
          startTime: String,
          endTime: String,
        }
    }]
  },
  thursday: {
    shifts: [{
        shiftOne: {
          startTime: String,
          endTime: String,
        }
    }]
  },
  friday: {
    shifts: [{
        shiftOne: {
          startTime: String,
          endTime: String,
        }
    }]
  },
  saturday: {
    shifts: [{
        shiftOne: {
          startTime: String,
          endTime: String,
        }
    }]
  },
  sunday: {
    shifts: [{
        shiftOne: {
          startTime: String,
          endTime: String,
        }
    }]
  },
})


// přidání dvou hodin
messageSchema.pre('save', function(next) {
  this.createdAt.setHours(this.createdAt.getHours() + 2);
  next();
});




//Login

app.post('/api/Login', async (req, res) => {
  console.log(req)
  const formEmail = req.body.email;
  console.log(formEmail)
  const formPass = req.body.password;

  const user = await User.findOne({ email: formEmail });


  console.log(user);
  
  if (user) {
    const comparePass = await bcrypt.compare(formPass, user.password);
    if (comparePass) {
      return res.status(200).send("Login successful");
    }
  }

  return res.status(401).send("Invalid credentials");
});

// TÝDNY

async function createNewWeek() {
  try {

    let latestWeek = await Week.findOne().sort({ startDate: -1 });
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


    var week = new Week({
      weekNumber: latestWeek.weekNumber + 1,
      startDate: date,
      monday: {
        dayDate: date,
        shifts: []
      },
      tuesday: {
        dayDate: tuesdayDate,
        shifts: []
      },
      wednesday: {
        dayDate: wednesdayDate,
        shifts: []
      },
      thursday: {
        dayDate: thursdayDate,
        shifts: []
      },
      friday: {
        dayDate: fridayDate,
        shifts: []
      },
      saturday: {
        dayDate: saturdayDate,
        shifts: []
      },
      sunday: {
        dayDate: sundayDate,
        shifts: []
      } 
    })

      await week.save();
      console.log(week);
    } catch (error) {
      console.error(error);
    }
}

const Week = mongoose.model('Week', weekSchema);

app.get('/api/Weeks', async (req, res) => {

  const weekNumber = req.query.weekNumber
  const weeks = await Week.findOne({weekNumber: weekNumber});


  if (!weekNumber) {
    res.status(400).send()
  }

  if (!weeks) {
    createNewWeek();
  }

  console.log(weeks);
  res.send(weeks);
});


app.get('/api/WeeksCurrent', async (req, res) => {
  try {

    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 2);


    const date = new Date(currentDate);
    date.setDate(date.getDate() - 6);


    const week = await Week.findOne({ startDate: { $gt: date, $lte: currentDate } });

    if (week) {
      res.json(week.weekNumber);
    } else {
      res.json({ message: 'No week found for current date' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


app.post('/api/Weeks', async (req, res) => {
  try {
    createNewWeek();
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

//TEMPLATE

const Template = mongoose.model('Template', templateSchema);

app.get('/api/Templates', async (req, res) => {
  const template = await Template.find();
  console.log(template);
  res.send(template);
});

//SMĚNY


const Shift = mongoose.model('Shift', shiftSchema);


app.get('/api/Shifts', async (req, res) => {
  const shifts = await Shift.find();
  console.log(shifts)
  res.send(shifts);
});

app.post('/api/Shifts', async (req, res) => {
 
  try {
    let shift = new Shift({
      startTime: req.body.startTime,
      endTime: req.body.endTime,
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

app.patch('/api/Shifts', async (req, res) => {
  try {
    let shift = await Shift.findOne({ _id: req.body.id});

    if (!shift) {
      res.status(404).send("Shift not found.")
    } else {
        startTime = req.body.startTime || shift.startTime;
        endTime = req.body.endTime || shift.endTime;
        assignedTo = req.body.assignedTo || shift.assignedTo;
    }

    await shift.save();
    console.log(shift);
    res.send(shift);

  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});




//UŽIVATELÉ


const User = mongoose.model('User', userSchema);

app.get('/api/Users', async (req, res) => {
  const users = await User.find();
  console.log(users);
  res.send(users);
});


app.post('/api/Users', async (req, res) => {
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

app.patch('/api/Users/:id',  async (req, res) => {
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

app.delete('/api/Users/:id', async (req, res) => {
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

app.get('/api/Messages', async (req, res) => {
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



app.post('/api/Messages', async (req, res) => {
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


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


