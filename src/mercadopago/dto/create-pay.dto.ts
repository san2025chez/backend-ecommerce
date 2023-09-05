import { IsDate, IsOptional, IsString } from "class-validator";
import { Purchase } from '../../purchase/entities/purchase.entity';

export class CreatePayDto {
    @IsString()
    status: string;

    @IsOptional()
    purchase: Purchase;
    @IsDate()
    fecha:Date
}