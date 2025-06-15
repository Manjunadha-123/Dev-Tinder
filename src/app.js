const express = require('express');

const app = express();

const {Auth} = require('./middlewares/auth.js');

app.use('/Admin',Auth);

app.get('/Admin/getAllData',(req,res)=>{
    res.send("All data retrieved successfully");
})

app.get('/Admin/DeleteData',(req,res)=>{
    res.send("All data Deleted successfully");
})




app.listen(3000, ()=>{console.log('Server is running on port 3000');});