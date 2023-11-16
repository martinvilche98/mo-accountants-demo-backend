import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthValidation {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty() @IsString()
    password: string;
}

