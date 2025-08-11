import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { Employee, EmployeeSchema } from './schemas/employee.schema';
import { AuthModule } from '../auth/auth.module'; // ✅ Import AuthModule so JwtStrategy is available

@Module({
  imports: [
    AuthModule, // ✅ Brings in JwtStrategy & PassportModule
    MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeSchema }]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
