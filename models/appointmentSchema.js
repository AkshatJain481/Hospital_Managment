import mongoose from "mongoose";

import validator from "validator";


const appointmentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First name must contain at least 3 characters"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "First name must contain at least 3 characters"]
    },
    email: { 
        type: String,
        required: true,
        validate: [validator.isEmail, "please provide the valid email"] // Will check the Email 
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Phone number must contain exactly 10 digits"],
        maxLength: [10, "Phone number must contain exactly 10 digits"] // Will check the digits of the phone number if they are 10 or not
    }, 
    nic: {
        type: String,
        required: true,
        minLength: [5, "NIC must contain exactly 5 digits"],
        maxLength: [5, "NIC must contain exactly 5 digits"] // Will check the digits of the phone number if they are 10 or not
    }, 
    dob: {
        type: Date,
        required:[true , "DOB is required"]
    },
    gender: {
        type:String,
        enum:["Male" ,"Female"], 
    },
    appointment_date:{
        type: String,
        required: true,
    },
    department:{
        type: String,
        required: true,
    },
    doctor:{
        firstName:{
            type: String,
            required: true,
        },
        lastName:{
            type: String,
            required: true,
        }
    },
    hasVisited :{
        type: Boolean,
        default: false,

    },
    doctorId:{
        type: mongoose.Schema.ObjectId,
        required: true,

    },
    patientId:{
        type: mongoose.Schema.ObjectId,
        required: true,

    },
    address:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",

    },

    
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);

