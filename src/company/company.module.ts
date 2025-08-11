import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { Company, CompanySchema } from './schemas/company.schema';
import { AuthModule } from '../auth/auth.module'; 

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Company.name, schema: CompanySchema },
    ]),
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService], // required if AppModule or others use it
})
export class CompanyModule {}
