import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Company extends Document {
  @Prop({ required: true, unique: true })
  c_name: string;

  @Prop()
  category: string;

  @Prop()
  logo: string; // Store URL or file reference
}

export const CompanySchema = SchemaFactory.createForClass(Company);
export type CompanyDocument = Company & Document;