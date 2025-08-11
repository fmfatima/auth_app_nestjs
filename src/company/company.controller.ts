import { Controller, Post, Get, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { CreateCompanyDto } from './dto/createCompany.dto';
import { CompanyService } from './company.service';
import { UpdateCompanyDto } from './dto/updateCompany.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/roles.decorator';
import { RolesGuard } from 'src/common/roles.guard';

@Controller('company')
export class CompanyController {
    constructor(
        private readonly companyService: CompanyService
    ) {}

    // POST /company/create-company
    // Admin: create a company
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Post('/create-company')
    createCompany(@Body() createCompanyDto: CreateCompanyDto): Promise<{ message: string }> {
        return this.companyService.createComp(createCompanyDto);
    }

    // GET /company/list-companies
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin', 'employee')
    @Get('/list-companies')
    findAll() {
        return this.companyService.findAllCompanies();
    }

    // GET /company/:c_name
    // Admin only: view a single company
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Get(':c_name')
    findOne(@Param('c_name') c_name: string) {
        return this.companyService.findCompany(c_name);
    }
    
    // PATCH /company/update/:email
    // Admin only: update company
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Patch('/update/:c_name')
    updateCompany( @Param('c_name') c_name: string, @Body() data: UpdateCompanyDto,) {
    return this.companyService.updateCompanyByName(c_name, data);
    }
    
    
    // Delete /company/:c_name
  // Admin only: delete company
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('admin')
    @Delete(':c_name')
    deleteCompany(@Param('c_name') c_name: string) {
    return this.companyService.deleteCompanyByName(c_name);
    }

}
