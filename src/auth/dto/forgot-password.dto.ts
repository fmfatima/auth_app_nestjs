import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {
    @IsNotEmpty()
    @IsEmail({}, {message: 'Enter valid email'})
    readonly email: string;
}