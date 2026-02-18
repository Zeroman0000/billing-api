import { Body, Controller,Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { Public } from '../common/decorators/public.decorator';
import { RefreshToken } from './refresh-token.schema';
import { use } from 'passport';

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

    @Post('refresh')
    async refresh(@Body('refreshToken')refreshToken:string){
        return this.authService.refreshToken(refreshToken)
    }

    @Public()
    @Post('logout')
    async logout(@Body('refreshToken')refreshToken:string){
        return this.authService.logout(refreshToken);
    }

    @Public()
    @Post('logout-all')
    async logoutAll(@Body('userId')userId:string){
        return this.authService.logoutAllDevices(userId);
    }
}
