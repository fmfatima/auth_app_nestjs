import { CreateCompanyDto } from './dto/createCompany.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Company, CompanyDocument } from './schemas/company.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateCompanyDto } from './dto/updateCompany.dto';

@Injectable()
export class CompanyService {
    constructor(
        @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
    ) {}

    async createComp(createCompanyDto: CreateCompanyDto): Promise<{ message: string }> {
    const { c_name, category, logoUrl } = createCompanyDto;

    try {
        await this.companyModel.create({ c_name, category, logoUrl });
        return { message: 'Company created successfully' };
    } catch (error) {
        if (error.code === 11000) {
        throw new Error('Company name must be unique.');
        }
        throw error;
    }
    }

    //get complete list of companies
    async findAllCompanies() {
        return this.companyModel.find(); 
    }

    // Search company by name
    async findCompany(term: string) {
    return this.companyModel.findOne({ c_name: term });
    }

    //update company using name
    async updateCompanyByName(c_name: string, data: UpdateCompanyDto) {
    const company = await this.companyModel.findOne({ c_name });

    if (!company) {
        throw new NotFoundException('Comapny not found');
    }

    Object.assign(company, data); // merge new fields
        await company.save();

    return { message: `Company ${c_name} updated successfully` };
    }
    


    async deleteCompanyByName(c_name: string) {
    const company = await this.companyModel.findOneAndDelete({ c_name });

    if (!company) {
        throw new NotFoundException('Comapny not found');
    }

    return { message: `Comapny with name ${c_name} deleted successfully` };
    }
}
