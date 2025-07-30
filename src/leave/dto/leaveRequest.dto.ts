import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LeaveRequestDto {
  @IsNotEmpty()
  @IsString()
  readonly leaveType: string;

  @IsNotEmpty()
  @IsString()
//   @IsEmail({}, { message: 'Please enter correct email' })
  readonly duration: string;

  @IsNotEmpty()
  @IsString()
//   @MinLength(6)
  readonly date: string;

  @IsNotEmpty()
  @IsString()
  readonly comment: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: '' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  token: string;
}