const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const userRoutes = require('./Routes/user.routes');
app.use(express.json());
mongoose.connect('mongodb+srv://Eng-Ahmett:Ahmed123@cluster0.kt7zden.mongodb.net/?appName=Cluster0',).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});
app.use('/users', userRoutes);

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}); 
