const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/pro-meal-kitchen', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const userRoutes = require('./routes/userRoutes');

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
