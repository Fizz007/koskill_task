const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const SECRET_KEY = "FAIZZAPI1"

const userSignup = async (req,res)=> {

    const {name,email, password} = req.body

    try{
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"User already exist"})
        }

        const hashPass = await bcrypt.hash(password,10);

        const result = await User.create({
            name:name,
            email:email,
            password:hashPass
        })

        const token = jwt.sign({email: result.email, id:result._id}, SECRET_KEY);
        res.status(200).json({user:result, token:token})

    }catch(error){
        console.log(error)
    }
}

const userSignin = async (req,res)=> {
    const {email, password} = req.body;

    try{
        const existingUser = await User.findOne({email})
        if(!existingUser){
            return res.status(400).json({message:"User not found"})
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);

        if(!matchPassword){
            res.status(400).json({message:"Invalid credentials"})
        }

        const token = jwt.sign({email: existingUser.email, id:existingUser._id}, SECRET_KEY);
        res.status(200).json({user:matchPassword, token:token})
    }catch(error){
        
        res.status(500).json({message:"Something went wrong"})
    }
}



module.exports = {userSignup,userSignin};