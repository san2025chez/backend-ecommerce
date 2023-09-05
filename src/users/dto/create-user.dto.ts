import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;
    @IsString()
    surname: string;
    @IsString()
    phone: string

    @IsEmail()
    email: string
    @IsString()
    password: string

    @IsString()
    @IsOptional()
    barrio?: string;

    @IsString()
    @IsOptional()
    calle?: string;

    @IsString()
    @IsOptional()
    numero?: string;

    @IsString()
    @IsOptional()
    localidad?: string;

}