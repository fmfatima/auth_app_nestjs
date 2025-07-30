import { IsEmail } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserLeaveDocument = UserLeave & Document;

@Schema({ timestamps: true })
export class UserLeave {
  @Prop()
  leaveType: string;

  @Prop()
  duration: string;

  @Prop()
  date: string;

  @Prop()
  comment: string;

  @Prop()
  @IsEmail()
  email: string;

  // for admin leave approvals
  @Prop({ default: 'pending', enum: ['pending', 'approved', 'rejected'] })
  status: string;
}

export const UserLeaveSchema = SchemaFactory.createForClass(UserLeave);
