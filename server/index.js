const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Serve static files from the Angular app build directory
app.use(express.static(path.join(__dirname, '../dist/angular-app')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/pro-meal-kitchen', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const userRoutes = require('./routes/userRoutes');

app.use('/api/users', userRoutes);

// Catch all handler: send back index.html for Angular routing (excluding /api routes)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/angular-app/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
