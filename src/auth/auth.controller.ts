import { Body, Controller, Get, Post, UseGuards, Param, Patch, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SendInvitationDto } from './dto/send-invitation.dto';
// import { AuthGuard } from '@nestjs/passport';
// import { Roles } from 'src/common/roles.decorator';
// import { RolesGuard } from 'src/common/roles.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
        return this.authService.signUp(signUpDto);
    }

    @Get('/login')
    login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
        return this.authService.login(loginDto);
    }

    //forgot or rest password
    @Post('forgot-password')
    forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
    }

    @Post('reset-password')
    resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
    }

        
    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles('admin')
    @Post('send-invitation')
    sendInvitation(@Body() dto: SendInvitationDto) {
    return this.authService.sendInvitation(dto);
    }

    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles('admin') // apply to all routes below
    @Get('users')
    findAll() {
        return this.authService.findAllUsers();
    }

    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles('admin') // apply to all routes below
    @Get('users/:term')
    findOne(@Param('term') term: string) {
        return this.authService.findUser(term);
    }
    
    @Patch('users/email/:email')
    updateUserByEmail(@Param('email') email: string, @Body() data: any) {
    return this.authService.updateUserByEmail(email, data);
    }

    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles('admin') 
    @Delete('users/email/:email')
    deleteUserByEmail(@Param('email') email: string) {
    return this.authService.deleteUserByEmail(email);
    }


}