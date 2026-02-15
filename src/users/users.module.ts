import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, usersSchema } from './schemas/users.schema';
import { userRepo } from './users.repository';

@Module({
  imports:[MongooseModule.forFeature([{
    name:User.name,schema:usersSchema
  }])],
  providers: [UsersService,userRepo],
  controllers: [UsersController]
})
export class UsersModule {}
