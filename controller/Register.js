import registerSchema from "../model/Register.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

const generateToken=(userId)=>{
    return jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:'1d'});
}

export const getAllRegisteredUser=async (req,res)=>{
    try {
        const user=await registerSchema.find()
        res.json(user)
    } catch (error) {
        console.log(error)
    }
}

export const addUser=async(req,res)=>{
    try {

        let {name,email,password}=req.body;
        let hashedPassword= await bcrypt.hash(password,10);
        const result= await registerSchema.create({name,email,password:hashedPassword})
        const token= generateToken(result._id.toString());
        res.json({token})
 
        console.log(result)
        
    } catch (error) {
        res.send(error)
    }
}

export const LoginUser=async(req,res)=>{
    try {
        let {email,password}=req.body;
        let user= await registerSchema.findOne({email});
        if(!user)
        {
        return res.json("user do not exits");
        }

        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch)
        {
             return res.status(400).json({ message: "Password incorrect" });
        }
         const token = generateToken(user._id.toString());
         return res.status(200).json({ token });

    } catch (error) {
        res.json(error)
    }
}