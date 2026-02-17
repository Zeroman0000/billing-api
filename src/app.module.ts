import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [UsersModule,MongooseModule.forRoot('mongodb://localhost:27017/billing-api'), AuthModule],
  controllers: [AppController],
  providers: [AppService,{
    provide:APP_GUARD,
    useClass:JwtAuthGuard
  }],
})
export class AppModule {}
