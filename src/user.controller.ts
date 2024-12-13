import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { MessagePattern } from "@nestjs/microservices";
import { IFindId, ILogin, ISignup } from "./interface/user.interface";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern("signup")
  signup(signupDto:ISignup){
    return this.userService.signup(signupDto)
  }

  @MessagePattern("login")
  login(loginDto:ILogin){
    return this.userService.login(loginDto)
  }

  @MessagePattern("find_by_id")
  findUserById(findDto:IFindId){
    return this.userService.findUserById(findDto)
  }
 
}
