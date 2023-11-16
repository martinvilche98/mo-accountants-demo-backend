import { IsDateString, IsDecimal, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CompanyReceiptValidator {
    @IsNotEmpty()
    @IsString()
    @IsDateString()
    emitted_at;
    @IsNotEmpty()
    @IsDecimal()
    tax_amount;
    @IsNotEmpty()
    @IsDecimal()
    tax_percentage;
}

export class SubmitCompanyReceiptValidator {
    @IsNotEmpty()
    @IsString()
    company_name;
    @IsNotEmpty()
    @IsString()
    fiscal_number;
    @IsNotEmpty()
    @IsString()
    customer_number;

    @ValidateNested({ each: true })
    @Type(() => CompanyReceiptValidator)
    receipts: CompanyReceiptValidator[];
}

