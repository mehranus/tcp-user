import { Module } from "@nestjs/common";
import {  UserService } from "./user.service";
import { UserController } from "./user.controller";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/microservice-todo')
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
