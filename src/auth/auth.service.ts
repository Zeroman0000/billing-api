import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { Public } from 'src/common/decorators/public.decorator';

@Injectable()
export class AuthService {
 constructor(private userService:UsersService,private jwtService:JwtService){}

 
//Register
  async createUser(createUserDto:CreateUserDto){
    const existingUser= await this.userService.findEmail(createUserDto.email,true);
    if(existingUser){
        throw new BadRequestException("Email already Exist")
    }

    const user=await this.userService.newUser(createUserDto);

    const payload={
        sub:user._id,
        email:user.email,
        roles:user.role 
    };

    return {
        message:"user register succesfully",
        access_token:this.jwtService.sign(payload)
    };
  }
    //Login
    async login(email:string,password:string){
      const user=await this.userService.findEmail(email,true);
      if(!user){
        throw new UnauthorizedException("Invalid credentials");
      }

     const isMatch=await bcrypt.compare(password,user.password);
      if(!isMatch){
        throw new UnauthorizedException("Invalid credentials");
      }

      const payload={
        sub:user._id,
        email:user.email,
        roles:user.role
      }
      return {
        access_token:this.jwtService.sign(payload)
      };
    }
}
