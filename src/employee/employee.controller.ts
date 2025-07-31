import { Body, Controller, Get, Post, UseGuards, Param, Patch, Delete } from '@nestjs/common';
import { SendInvitationDto } from './dto/send-invitation.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeService } from './employee.service';
// import { AuthGuard } from '@nestjs/passport';
// import { Roles } from 'src/common/roles.decorator';
// import { RolesGuard } from 'src/common/roles.guard';


@Controller('employee')
export class EmployeeController {
    constructor(
        private readonly employeeService: EmployeeService
    ) {}

    // POST /employee/send-invitation
    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles('admin')
    @Post('send-invitation')
    sendInvitation(@Body() dto: SendInvitationDto) {
    return this.employeeService.sendInvitation(dto);
    }

    // GET /employee/users
    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles('admin') // apply to all routes below
    @Get('users')
    findAll() {
        return this.employeeService.findAllUsers();
    }

    // GET /employee/users/:email
    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles('admin') // apply to all routes below
    @Get('users/:email')
    findOne(@Param('email') email: string) {
        return this.employeeService.findUser(email);
    }
    
    // PATCH /employee/users/email/:email
    
    @Patch('users/email/:email')
    updateUserByEmail(@Param('email') email: string, @Body() data: UpdateEmployeeDto) {
    return this.employeeService.updateUserByEmail(email, data);
    }

    // Delete /employee/users/:email
    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles('admin') 
    @Delete('users/:email')
    deleteUserByEmail(@Param('email') email: string) {
    return this.employeeService.deleteUserByEmail(email);
    }
}
