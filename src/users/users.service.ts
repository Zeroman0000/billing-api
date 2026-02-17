import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { userRepo } from './users.repository';
import { UpdateUserDto } from './dto/updateuser.dto';

@Injectable()
export class UsersService {
    constructor(private readonly UserRepo:userRepo){}

    findAll(){
        return this.UserRepo.getAll();
    }

    newUser(createUserDto:CreateUserDto){
        return this.UserRepo.createUser(createUserDto);
    }

    find(id:string){
        return this.UserRepo.findById(id);
    }

    update(id:string,data:UpdateUserDto){
        return this.UserRepo.update(id,data);
    }

    delete(id:string){
        return this.UserRepo.delete(id);
    }
 
    findEmail(email:string,withPassword=false){
        return this.UserRepo.findByEmail(email,withPassword);
    }
}
