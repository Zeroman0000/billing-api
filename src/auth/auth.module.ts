import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from "./jwt.strategy";
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshToken, RefreshTokenSchema } from './refresh-token.schema';

@Module({
  imports: [UsersModule, PassportModule,JwtModule.register({
    secret:'superSecretKey',
    signOptions:{expiresIn:'1h'},
  }),MongooseModule.forFeature([{name:RefreshToken.name,schema:RefreshTokenSchema}])],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
