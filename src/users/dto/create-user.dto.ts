import { IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;
    @IsString()
    surname: string;
    @IsString()
    phone: string

    @IsString()
    @IsOptional()
    barrio?: string;

    @IsString()
    @IsOptional()
    calle?: string;

    @IsString()
    @IsOptional()
    numero?: number;

    @IsString()
    @IsOptional()
    localidad?: string;

}