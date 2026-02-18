import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { Public } from 'src/common/decorators/public.decorator';
import { InjectModel } from '@nestjs/mongoose';
import { RefreshToken, refreshTokenDocument } from './refresh-token.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService,
    @InjectModel(RefreshToken.name) private refreshTokenModel: Model<refreshTokenDocument>
  ) { }


  //Register
  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findEmail(createUserDto.email, true);
    if (existingUser) {
      throw new BadRequestException("Email already Exist")
    }

    const user = await this.userService.newUser(createUserDto);

    const payload = {
      sub: user._id,
      email: user.email,
      roles: user.role
    };

    return {
      message: "user register succesfully",
      access_token: this.jwtService.sign(payload)
    };
  }
  //Login
  async login(email: string, password: string, device?: string, ipAddress?: string) {
    const user = await this.userService.findEmail(email, true);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return this.generateNewTokens(user.id, device, ipAddress);
  }

  //refreshToken
  async refreshToken(incomingToken: string) {
    const payload:any=this.jwtService.verify(incomingToken,{secret:process.env.REFRESH_SECRET});
    const userId=payload.sub;

    const tokens = await this.refreshTokenModel.find({
      user: userId,
      isRevoked: false
    })

    for (const token of tokens) {
      const isMatch = await bcrypt.compare(
        incomingToken, token.tokenHash
      )
      if (isMatch) {
        token.isRevoked = true;
        await token.save();

        return this.generateNewTokens(userId);
      }
    }
    throw new UnauthorizedException("Refresh token not found");

  }

  private async generateNewTokens(userId: string, device?: string, ipAddress?: string) {
    const payload = { sub: userId };

    const accessToken = this.jwtService.sign(payload, { expiresIn: "15m" });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_SECRET,
      expiresIn: "7d",
    });

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await this.refreshTokenModel.create({
      user: userId,
      tokenHash: hashedRefreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      device: device || "unknown",
      ipAddress: ipAddress || "unknown",
    });

    return { accessToken, refreshToken };
  }
  async logout(refreshToken:string){
    const token=await this.refreshTokenModel.findOne({
      tokenHash:{$exists:true},
      isRevoked:false
    })

    if(!token){
      throw new UnauthorizedException("Token already revoked or invalid");
    }

    token.isRevoked=true;
    await token.save();

    return {message:"Logged out successfully"}
  }

  async logoutAllDevices(userId:string){
    await this.refreshTokenModel.updateMany(
      {user:userId,isRevoked:false},
      {isRevoked:true}
    )
    return {message:"Logged out successfully from all devices"}
  }
}
