import { IsString, IsArray, ValidateNested, IsEnum, IsNumber } from 'class-validator';
import { Type } from 'class-transformer'

class ContactDto {

    @IsString()
    name: string;

    @IsString()
    phone: string;


    
}

export class CreateVendorDto {
    @IsString()
    name: string;


    @IsEnum(['kg', 'tone', 'pack'])
    unit: 'kg' | 'tone' | 'pack';

    @IsNumber()
    totalAmountPayable: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ContactDto)
    contact: ContactDto[];
    
}

