import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true 
})
export class User{
    
    @Prop()
    name: string

    @Prop({unique: [true, 'Duplicate Email entered']})
    email: string

    @Prop()
    password: string

    //for forget or reset password
     @Prop()
    resetCode?: string;

    @Prop()
    resetCodeExpires?: Date;

    //role based authentication
    @Prop({ default: 'employee', enum: ['admin', 'employee'] }) 
    role: string;

    @Prop({ default: false })
    invited: boolean;

    @Prop()
    invitationToken?: string;

    @Prop()
    invitationTokenExpires?: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);