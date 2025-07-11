import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
    
    @IsNotEmpty()
    @IsEmail({},{message:'Enter valid email.'})
    readonly email: string;

    @IsNotEmpty()
    readonly code: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly  newPassword: string;
}