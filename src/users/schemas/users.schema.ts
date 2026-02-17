import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";
import { HydratedDocument } from "mongoose";
import passport, { use } from "passport";
import { ROLES } from "src/common/roles.enum";

export type UserDocument = HydratedDocument<User> & {
  validatePassword: (password: string) => Promise<boolean>;
};

@Schema()
export class User{

    @Prop({required:true})
    name:string

    @Prop({required:true,unique:true})
    email:string

    @Prop({required:true,select:false})
    password:string

    @Prop({
      type:String,
      enum:ROLES,
      default:ROLES.USER
    })
    role:ROLES
}

export const usersSchema=SchemaFactory.createForClass(User);

usersSchema.pre<UserDocument>('save',async function(){
  if(!this.isModified('password')) return;
  const salt=await bcrypt.genSalt(10);
  this.password=await bcrypt.hash(this.password,salt);
})

usersSchema.methods.validatePassword= async function (password:string):Promise<boolean>{
    return bcrypt.compare(password,this.password);
}