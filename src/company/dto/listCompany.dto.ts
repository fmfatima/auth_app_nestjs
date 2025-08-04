import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyDto {
    @IsNotEmpty()
    @IsString()
    readonly c_name: string;

    @IsNotEmpty()
    @IsString()
    category: string;

    @IsNotEmpty()
    @IsString()
    logoUrl?: string; // url of logo

}