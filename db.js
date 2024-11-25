const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.MONGO_URI)

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Mongoose connected to the database');
});

db.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

db.on('disconnected', () => {
  console.log('Mongoose disconnected from the database');
});