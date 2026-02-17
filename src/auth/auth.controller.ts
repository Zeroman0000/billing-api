import { Body, Controller,Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){}

    @Public()
    @Post('register')
    register(@Body() createUser:CreateUserDto){
        return this.authService.createUser(createUser);
    } 
    
    @Public()
    @Post('login')
    login(@Body()body:{email:string,password:string}){
        return this.authService.login(body.email,body.password);
    }
}
