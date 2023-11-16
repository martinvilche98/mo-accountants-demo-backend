import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserValidator {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty() @IsString()
    first_name: string;

    @IsNotEmpty() @IsString()
    last_name: string;

    @IsNotEmpty() @IsString()
    password: string;
}

