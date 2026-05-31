const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://Eng-Ahmett:Ahmed123@cluster0.kt7zden.mongodb.net/?appName=Cluster0',).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}); 
