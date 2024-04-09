import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
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
    message: {
        type: String,
        required: true,
        minLength: [10, "Phone number must contain 10 characters"], 
    }, 

});

export const Message = mongoose.model("Message" ,messageSchema );
