import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User{

    @Prop({required:true})
    name:string

    @Prop()
    email:string
}

export const usersSchema=SchemaFactory.createForClass(User);