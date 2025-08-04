import { Controller, Post, Get, Body, Param, Patch, Delete } from '@nestjs/common';
import { CreateCompanyDto } from './dto/createCompany.dto';
import { CompanyService } from './company.service';
import { UpdateCompanyDto } from './dto/updateCompany.dto';

@Controller('company')
export class CompanyController {
    constructor(
        private readonly companyService: CompanyService
    ) {}

    // POST /company/create-company
    @Post('/create-company')
    createCompany(@Body() createCompanyDto: CreateCompanyDto): Promise<{ message: string }> {
        return this.companyService.createComp(createCompanyDto);
    }

    // GET /company/list-companies
    @Get('/list-companies')
    findAll() {
        return this.companyService.findAllCompanies();
    }

    // GET /company/:c_name
    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles('admin') // apply to all routes below
    @Get(':c_name')
    findOne(@Param('c_name') c_name: string) {
        return this.companyService.findCompany(c_name);
    }
    
    // PATCH /company/update/:email
    
    @Patch('/update/:c_name')
    updateCompany( @Param('c_name') c_name: string, @Body() data: UpdateCompanyDto,) {
    return this.companyService.updateCompanyByName(c_name, data);
    }
    
    
    // Delete /company/:c_name
    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles('admin') 
    @Delete(':c_name')
    deleteCompany(@Param('c_name') c_name: string) {
    return this.companyService.deleteCompanyByName(c_name);
    }

}
