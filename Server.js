const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const userRoutes = require('./Routes/user.routes');
app.use(express.json());
// catagory routes
const catagoryrouter = require('./Routes/catagory.routes');
const { CatagoryModel } = require('./models/catagory.service');
const transectionrouter = require('./Routes/transaction.routes');


mongoose.connect('mongodb+srv://Eng-Ahmett:Ahmed123@cluster0.kt7zden.mongodb.net/?appName=Cluster0',).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});


app.use('/users', userRoutes);
app.use('/catagory', catagoryrouter);
app.use('/transection', transectionrouter);
// error handling middleware for invalid JSON payloads

app.use((err, req, res, next) => {
   if(err instanceof SyntaxError && err.status === 400 && 'body' in err){
    return res.status(400).json({
        status: 'false',
        message: 'Invalid JSON payload',
        error: err.message
    });
   }
   next(err);
});
// router for catagory routes

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}); 
