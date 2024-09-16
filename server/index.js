const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const PORT = 5000;
const departmentRoute = require('./Routes/departmentRoute');
const loginRoute = require('./Routes/loginRoute');
const employeeRoute = require('./Routes/employeeRoute');
const attendanceRoute = require('./Routes/attendanceRoute');

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_CONNECTING_STRING)
    .then(()=>{
        console.log("connected database");
    }).catch((err)=>{
        console.log(err); 
    })

app.use('/api/Department', departmentRoute);
app.use('/api/Login', loginRoute);
app.use('/api/Employee', employeeRoute);
app.use('/api/Attendance',attendanceRoute)

app.listen(PORT, ()=>{
    console.log(`The server is Running on PORT : ${PORT}`);
})