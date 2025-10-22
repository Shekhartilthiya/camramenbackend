import bcrypt from "bcryptjs";
import User from "../model/userModel.js";
import jwt from "jsonwebtoken";

// Generate Token
const generateToken =(id)=>{

    jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"7d"},(err,token)=>{
        // console.log(token);
        if(err) console.log(err);
        return token;
    })
}
// Register User
export const registerUser= async(req,res) =>{
    const {name, email ,password} = req.body;

    try{

        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({error: "User Already Exists"});
        }

        const user = await User.create({name, email,password});
        const token = generateToken(user._id);
        // console.log(token);

        res.cookie("token",token,{httpOnly:true});
        res.status(200).json({_id: user._id , name:user.name,email:user.email,});


    }catch(error){
        res.status(400).json({error:error.message} );
    }
}

// Login User
export const loginUser = async(req,res) =>{
    const {email,password} = req.body;


    try{
        const user = await User.findOne({email}).select("+password");
        if(!user){
            return res.status(400).json({error: "User Not Found"});
        }
        if(user && (await bcrypt.compare(password,user.password))){

            const token = generateToken(user._id);
            res.cookie("token",token,{httpOnly:true});
            res.status(200).json({_id: user._id , name:user.name,email:user.email});
        }else{
            res.status(401).json({message: "Invalid Credentials"});
        }

    }catch(error){
        res.status(500).json({error:error.message} );
    }
}

// Logout User

export const logoutUser = async(req,res) =>{
    res.clearCookie("token");
    res.json({message:"User Logged Out Successfully"});  
    
}
