import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
    _id: string;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop({ unique: [true, 'Duplicate Email entered'] })
    email: string;

    @Prop()
    password: string;

    // for forgot/reset password
    @Prop()
    resetCode?: string;

    @Prop()
    resetCodeExpires?: Date;

    // role based authentication
    @Prop({ default: 'employee', enum: ['admin', 'employee'] })
    role: string;

    @Prop({ default: false })
    invited: boolean;

    @Prop()
    invitationToken?: string;

    @Prop()
    invitationTokenExpires?: Date;

    @Prop({ required: false })
    refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
