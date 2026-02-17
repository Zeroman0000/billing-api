import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class CreateUserDto{

    @IsNotEmpty()
    @IsString()
    name!:string

    @IsString()
    @IsEmail()
    email!:string

    @IsString()
    @MinLength(6)
    password!:string
}