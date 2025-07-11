import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';


@Injectable()
export class AuthService {
    constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
    ) {}

    async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token };
    }

    async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
        throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
        throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token };
    }

    // forgot password logic
    async forgotPassword(dto: ForgotPasswordDto): Promise<{ message: string }> {
    const user = await this.userModel.findOne({ email: dto.email });

    if (!user) {
        throw new NotFoundException('User not found');
    }

    const resetCode = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit code
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 10); // Code valid for 10 min

    user.resetCode = resetCode;
    user.resetCodeExpires = expires;
    await user.save();

    // For now: log it or return it in dev mode
    console.log(`Reset code for ${user.email}: ${resetCode}`);

    return { message: 'Reset code sent to email (mocked)' };
    }

    //Reset password logic

    async resetPassword(dto: ResetPasswordDto): Promise<{ message: string }> {
    const user = await this.userModel.findOne({ email: dto.email });

    if (!user || user.resetCode !== dto.code) {
        throw new BadRequestException('Invalid code or email');
    }

    const now = new Date();
    if (user.resetCodeExpires && user.resetCodeExpires < now) {
        throw new BadRequestException('Reset code has expired');
    }

    user.password = await bcrypt.hash(dto.newPassword, 10);
    user.resetCode = undefined;
    user.resetCodeExpires = undefined;
    await user.save();

    return { message: 'Password reset successfully' };
    }


}