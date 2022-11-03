import * as bcrypt from 'bcryptjs';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;
export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop()
  password: string;

  @Prop({
    enum: Object.values(UserRole),
    type: String,
    default: UserRole.CUSTOMER,
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export async function hashPassword(
  password: string,
  round = 10,
): Promise<string> {
  return await bcrypt.hash(password, round);
}

export async function verifyPassword(
  newPassword: string,
  hashPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(newPassword, hashPassword);
}
