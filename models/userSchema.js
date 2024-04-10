import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
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
        type: Data,
        required:[true , "DOB is required"]
    },
    gender: {
        type:String,
        enum:["Male" ,"Female"], 
    },
    password:{
        type: String,
        minLength: [11 , "Password must contain at least 8 characters"],
        required: true,
        select: false
    },
    role:{
        type:String,
        required:true,
        enum:["Admin" , "Patient" , "Doctor"],
    },
    doctorDepartment:{
        public_id: String,
        url: String
    },

});


userSchema.pre("save" , async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password , 10);
});

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password)
};


userSchema.methods.generateJsonWebToken = function(){
    return jwt.sign({id: this._id} , process.env.JWT_SECRET_KEY, {
        expiresIn : process.env.JWT_EXPIRES,
    });
}



export const User = mongoose.model("Message" ,userSchema );
