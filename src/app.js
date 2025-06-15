const express = require('express');

const app = express();




app.get('/user',(req,res,next)=>{
    res.send('user data get suceessusfully');
    // next();
},(req,res)=>{
    res.send('user data2 get suceessusfully');
})


app.post('/user',(req,res)=>{
    res.send('user data post suceessusfully');
})

app.use('/user',(req,res)=>{
    res.send('user data middleware suceessusfully');
})




app.listen(3000, ()=>{console.log('Server is running on port 3000');});