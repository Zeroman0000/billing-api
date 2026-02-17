import { InjectModel } from "@nestjs/mongoose";
import { CreateUserDto } from "./dto/createUser.dto";
import { User } from "./schemas/users.schema";
import { Model } from "mongoose";
import { UpdateUserDto } from "./dto/updateuser.dto";

export class userRepo {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    async createUser(createUserDto: CreateUserDto) {
        const user = new this.userModel(createUserDto);
        return user.save();
    }

    async softDelete(id: string) {
        return this.userModel.findByIdAndUpdate(
            id,
            { isDelete: true, deleteAt: new Date() },
            { new: true, runValidators: true }
        )
    }

    async getAll() {
        return this.userModel.find();
    }

    async findById(id: string) {
        return this.userModel.findById(id);
    }

    async update(id: string, data: UpdateUserDto) {
        return this.userModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }

    async delete(id: string) {
        return this.userModel.findByIdAndDelete(id);
    }


    async findByEmail(email: string, withPassword:boolean = false) {
        let query =  this.userModel.findOne({ email }); 
        if (withPassword) {
            query = query.select('+password'); 
        }
        return query.exec(); 
    }

}