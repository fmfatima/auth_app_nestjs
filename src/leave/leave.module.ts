import { Module } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { LeaveController } from './leave.controller';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
// import { JwtStrategy } from './jwt.strategy';
import { UserLeave, UserLeaveSchema } from './schemas/leave.schema';

import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
        };
      },
    }),
    MongooseModule.forFeature([{ name: UserLeave.name, schema: UserLeaveSchema  }]),
  ],

  providers: [LeaveService],
  controllers: [LeaveController],
})
export class LeaveModule {}
