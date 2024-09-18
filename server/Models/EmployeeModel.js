const mongoose = require('mongoose')

    const LoginSchema = new mongoose.Schema({
        employeeId: {
            type: String,
            required: true,
            unique:true  
        },
        name: {
            type: String,
            required: true  
        },
        email: {
            type: String,
            required: true  
        },
        password: {
            type: String,
            default:"password" 
        },
        position: {
            type:String,
        },
        department: {
            type:String,
        },
        dob: {
            type:Date,
        },
        contact:{
            type:String,
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Others'],
        },
        address: {
            type:String,
        },
        profilePictureUrl: {
            type:String
        },
        role: {
            type: String,
            default: 'employee'
        },
        resetToken: {
            type: String,    
        },
        expiryresetToken: {
            type: Date,     
        },
        loginAttempts: {
            type: Number,
            default: 0
        },
        lockUntil: {
            type: Date
        }
    }, { timestamps: true });
    

const Employee = new mongoose.model('Employee',LoginSchema)

module.exports = Employee;