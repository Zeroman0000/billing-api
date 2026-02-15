import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from "./dto/createUser.dto";
import { User } from "./schemas/users.schema";
import { Model } from "mongoose";
import { UpdateUserDto } from "./dto/updateuser.dto";

export class userRepo{
    constructor(@InjectModel(User.name) private readonly userModel:Model<User>){}

    async createUser(createUserDto:CreateUserDto){
        const user= new this.userModel(createUserDto);
        return await user.save();
    }
    
    async softDelete(id:string){
        return await this.userModel.findByIdAndUpdate(
            id,
            {new:true},
            {isDelete:true, deleteAt:new Date()}
        )}

    async getAll(){
        return await this.userModel.find();
    }

    async findById(id:string){
        return await this.userModel.findById(id);
    }

    async update(id:string ,data:UpdateUserDto){
        return await this.userModel.findByIdAndUpdate(id,data,{runValidators:true});
    }

    async delete (id:string){
        return await this.userModel.findByIdAndDelete(id);
    }
}