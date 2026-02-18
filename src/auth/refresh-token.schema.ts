import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { User } from "src/users/schemas/users.schema";

export type refreshTokenDocument=HydratedDocument<RefreshToken>;


@Schema({timestamps:true})
export class RefreshToken{

 @Prop({type:Types.ObjectId,ref:User.name,required:true})
 user:Types.ObjectId;

 @Prop({required:true})
 tokenHash:string;

 @Prop({required:true})
 expiresAt:Date;

 @Prop({default:false})
 isRevoked:boolean;

 @Prop()
 device:string;

 @Prop()
 ipAddress:string;
}

export const RefreshTokenSchema=SchemaFactory.createForClass(RefreshToken);