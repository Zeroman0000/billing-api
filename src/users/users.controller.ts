import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateuser.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService){};
    
   //  @Public()
    @Get()
    getAll(){
      return this.userService.findAll();
    }

    @Get(":id")
     getById(@Param("id")id:string){
        return this.userService.find(id);
     }

     @Post()
     createUser(@Body() createUserDto:CreateUserDto){
        return this.userService.newUser(createUserDto);
     }

     @Patch(':id')
     update(@Param('id')id:string,@Body()updateUser:UpdateUserDto,@CurrentUser()user){
        console.log(user);
        return this.userService.update(id,updateUser);
     }

     @Delete(':id')
     deleteById(@Param('id')id:string){
       return this.userService.delete(id);
     }
      
}
