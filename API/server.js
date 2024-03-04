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
  username: {
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
  privilageLevel: {
    type: String,
    enum: ["SuperAdmin", "Admin", "User"],
    default: "User"
  } 
});


const shiftSchema = new mongoose.Schema({
  date: Date,
  startTime: String,
  endTime: String,
  assignedTo: [userSchema] //přidat multiple users
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
        assignedTo: req.body.assignedTo
      });
    } else {
      user.name = req.body.name; //??
      user.description = req.body.description;
    }

    await user.save();
    res.send(user);

  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }

  await shift.save();
  res.send(shift);
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
    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        createdAt: req.body.createdAt || Date.now(),
        birthDate: req.body.birthDate,
        privilageLevel: req.body.privilageLevel || "User"
      });
    } else {

      user.username = req.body.username || user.username;
      user.birthDate = req.body.birthDate || user.birthDate;
      user.privilageLevel = req.body.privilageLevel || user.privilageLevel;

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


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


