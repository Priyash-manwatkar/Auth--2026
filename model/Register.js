import mongoose, { Schema } from "mongoose";
const registerUser=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique: true },
    password:{type:String,required:true},

})

const registerSchema= mongoose.model("registerSchema",registerUser);

export default registerSchema;