const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { check, validationResult } = require('express-validator');
const helmet = require('helmet');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

const UserSchema = new mongoose.Schema({
  seed_phrase: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

// Add a route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.post('/login', [
  check('seed_phrase', 'Seed phrase is required').not().isEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { seed_phrase } = req.body;

  try {
    const user = await User.findOne({ seed_phrase });
    if (!user) {
      return res.status(400).json({ message: 'Invalid seed phrase' });
    }

    res.json({ message: 'Login successful', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
