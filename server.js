const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

const UserSchema = new mongoose.Schema({
  seed_phrase: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

app.post('/login', async (req, res) => {
  const { seed_phrase } = req.body;

  const user = await User.findOne({ seed_phrase });
  if (!user) {
    return res.status(400).json({ message: 'Invalid seed phrase' });
  }

  res.json({ message: 'Login successful', user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
