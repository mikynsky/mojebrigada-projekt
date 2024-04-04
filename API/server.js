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
  date: Date,
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





//SMĚNY


const Shift = mongoose.model('Shift', shiftSchema);


app.get('/api/Shifts', async (req, res) => {
  const shifts = await Shift.find();
  console.log(shifts)
  res.send(shifts);
});

app.post('/api/Shifts', async (req, res) => {
  try {
    let shift = await Shift.findOne({ date: req.body.date});

    if (!shift) {
      shift = new Shift({
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        assignedTo: req.body.assignedTo
      });
    } else {
        date = req.body.date || shift.date;
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

app.delete('/api/Users', async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("User was not found.")
    }

    await User.deleteOne({ email: req.body.email });
    console.log(user);
    res.send(user);
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


