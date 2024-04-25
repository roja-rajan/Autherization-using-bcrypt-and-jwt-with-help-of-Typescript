import express,{Request,Response} from "express";
import bcrypr from "bcrypt";
import {user} from "./user";
var app=express();
app.use(express.json());
var signup=async function (req:Request,res:Response,next: () => void):Promise<void>{
    try{
        var username:string=req.body.name;
        var hashpassword:string=await bcrypr.hash(req.body.password,10);
        var person={"name":username,"password":hashpassword}
        user.push(person);
        next();
    }
    catch(error){
        res.status(404).send("password error")
    } 
     
}
export=signup;
