import { ParseUUIDPipe } from "@nestjs/common";
import { IsArray, IsNumber, 
    IsOptional, IsPositive,IsString } from "class-validator";
import { Category } from "../../category/entities/category.entity";
export class CreateProductDto2 {

    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    descriptions?: string;

    @IsNumber()
    @IsPositive()
    stock: number;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[];

    @IsString()
    @IsOptional()
    category?: Category[];
}
