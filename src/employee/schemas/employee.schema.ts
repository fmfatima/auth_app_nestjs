import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true 
})
export class Employee{
    
    @Prop()
    name: string

    @Prop({unique: [true, 'Duplicate Email entered']})
    email: string

    //role based authentication
    @Prop({ default: 'employee', enum: ['admin', 'employee'] }) 
    role: string;

    @Prop({ default: false })
    invited: boolean;

    @Prop()
    invitationToken?: string;

    @Prop()
    invitationTokenExpires?: Date;

    @Prop()
    password: string; 

}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);