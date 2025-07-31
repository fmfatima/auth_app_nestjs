import { Body, Post, Get, Query, Patch, Param, Delete } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { Controller } from '@nestjs/common';
import { LeaveRequestDto } from './dto/leaveRequest.dto';

@Controller('leave')
export class LeaveController {
    constructor(private leaveService: LeaveService) {}

    // GET /leave/leave_request
    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles('employee')
    @Post('/leave_request')
    // leaveReq(@Body() leaveReqDto: LeaveRequestDto): Promise<{ message: string; leaveId: string }> {
    leaveReq(@Body() leaveReqDto: LeaveRequestDto): Promise<{ message: string}> {
        return this.leaveService.leaveReq(leaveReqDto);
    }

    //GET leaves request regarding same email
    // GET /leave/leaves
    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles('admin')
    @Get('leaves')
    findAllByEmail(@Query('email') email: string)  {
        return this.leaveService.findAllLeavesByEmail(email);
    }

    //GET all leave request
    // GET /leave/
    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles('admin')
    @Get('/')
    findAll() {
        return this.leaveService.findAllLeaves();
    }

    // GET /leave/status?status=pending
    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles('admin')
    @Get('status')
    getByStatus(@Query('status') status: string) {
        return this.leaveService.getLeavesByStatus(status);
    }

    // PATCH /leave/update-status/<add leave_id to approvbe leave>?status=approved
    // PATCH /leave/update-status/<add leave_id to approvbe leave>?status=rejected

    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles('admin')
    @Patch('update-status/:id')
    updateStatus(
        @Param('id') id: string,
        @Query('status') status: 'approved' | 'rejected'
    ) {
        return this.leaveService.updateLeaveStatus(id, status);
    }

    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles('employee')
    @Delete('delete-leave/:id')
    deleteLeave(
        @Param('id') id: string,
        @Query('status') status: 'delete'
    ) {
        return this.leaveService.deleteLeaveStatus(id);
    }
    

}
