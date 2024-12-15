import { BadGatewayException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { IFindId, ILogin, ISignup } from './interface/user.interface';
import { genSaltSync, hashSync } from 'bcrypt';
import { error } from 'console';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel:Model<UserDocument>
  ){}

   async signup(signupDto:ISignup){

     try {
   
      let {email,name,password}=signupDto
      email=email.toLowerCase()
      let user=await this.userModel.findOne({email})
      if(user){
       return{
         status:HttpStatus.CONFLICT,
         message:"user account already exist!",
         error:true
       }
      } 
      const salt=genSaltSync()
      password=hashSync(password,salt)
      user=await this.userModel.create({
       name,
       email,
       password
      })
      return {
       status:HttpStatus.CREATED,
       message:"user acount create sucessfully",
       data:{
         userId:user._id.toString()
       }
      }
      
    } catch (error) {
      return{
        status:HttpStatus.BAD_REQUEST,
        message:error?.message,
        error:true
      }
    }
    
   }
   login(loginDto:ILogin){
    console.log(loginDto)
   }
   findUserById(findDto:IFindId){
    console.log(findDto)
   }
 
}
