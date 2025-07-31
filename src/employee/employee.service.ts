import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from './schemas/employee.schema';
import * as bcrypt from 'bcryptjs';
// import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { SendInvitationDto } from './dto/send-invitation.dto';


@Injectable()
export class EmployeeService {
    constructor(
    @InjectModel(Employee.name)
    private userModel: Model<Employee>,
    // private jwtService: JwtService,
    ) {}

    //invitation sedn admin feature
    async sendInvitation(dto: SendInvitationDto): Promise<{ message: string }> {
    const { email, role = 'employee' } = dto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
        throw new BadRequestException('User already exists');
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date();
    expires.setHours(expires.getHours() + 24); // token valid for 24 hrs

    // Save as a placeholder user (or just save invitation)
    await this.userModel.create({
        email,
        role,
        invited: true,
        invitationToken: token,
        invitationTokenExpires: expires,
    });

    const invitationLink = `https://leave-dashboard/signup?token=${token}&email=${email}`;

    // Replace with actual email service (e.g. Nodemailer)
    console.log(`Invitation link: ${invitationLink}`);

    return { message: 'Invitation sent (mocked)' };
    }

    // Get all users with role 'employee'
    async findAllUsers() {
    return this.userModel.find({ role: 'employee' }).select('-password'); // remove password
    }

    // Search user by email or name
    async findUser(term: string) {
    return this.userModel.findOne({
        $or: [{ email: term }, { name: term }],
    }).select('-password');
    }

    //update user using emial
    async updateUserByEmail(email: string, data: any) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
        throw new NotFoundException('User not found');
    }

    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }

    Object.assign(user, data); // merge new fields
    await user.save();

    const { password, ...rest } = user.toObject(); // exclude password
    return rest;
    }


    async deleteUserByEmail(email: string) {
    const user = await this.userModel.findOneAndDelete({ email });

    if (!user) {
        throw new NotFoundException('User not found');
    }

    return { message: `User with email ${email} deleted successfully` };
    }
}
