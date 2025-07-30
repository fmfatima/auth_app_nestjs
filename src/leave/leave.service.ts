import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserLeave, UserLeaveDocument } from './schemas/leave.schema';
import { JwtService } from '@nestjs/jwt';
import { LeaveRequestDto } from './dto/leaveRequest.dto';

@Injectable()
export class LeaveService {
  constructor(
    @InjectModel(UserLeave.name)
    private leaveModel: Model<UserLeaveDocument>,
    private jwtService: JwtService,
  ) {}

//   async leaveReq(leaveReqDto: LeaveRequestDto): Promise<{ message: string; leaveId: string }> {
  async leaveReq(leaveReqDto: LeaveRequestDto): Promise<{ message: string  }> {
    const { leaveType, duration, date, comment, email } = leaveReqDto;

    const leaveRequest: UserLeaveDocument = await this.leaveModel.create({
      leaveType,
      duration,
      date,
      comment,
      email,
    });

    return { 
      message: 'Leave request submitted successfully',
    //   leaveId: leaveRequest._id.toString(),
    };
  }

    // Get all leaves related to one email
    async findAllLeavesByEmail(email: string): Promise<UserLeave[]> {
      return this.leaveModel.find({ email }).exec(); 
    }

    // Get all leaves admin section 
    async findAllLeaves(): Promise<UserLeave[]> {
      return this.leaveModel.find().exec(); 
    }
    // Get all leaves by status (pending, approved, rejected)
    async getLeavesByStatus(status: string): Promise<UserLeave[]> {
      return this.leaveModel.find({ status }).exec();
    }

    // Admin section to updates leave status
    async updateLeaveStatus(id: string, newStatus: 'approved' | 'rejected'): Promise<UserLeave | null > {
    const updatedLeave = await this.leaveModel.findByIdAndUpdate(
      id,{ status: newStatus },{ new: true }).exec();

      if (!updatedLeave) {
        throw new NotFoundException(`Leave request with id ${id} not found`);
      }

      return updatedLeave;
    }

    // employee section to delete unapproved leave 
    async deleteLeaveStatus(id: string): Promise<UserLeave | null> {
    const leave = await this.leaveModel.findById(id).exec();

    if (!leave) {
      throw new NotFoundException(`Leave request with id ${id} not found`);
    }

    if (leave.status !== 'pending') {
      throw new BadRequestException(`Approved / Rejected leave requests cannot be deleted`);
    }
    const deletedLeave = await this.leaveModel.findByIdAndDelete(id).exec();

    return deletedLeave;
    }

}
