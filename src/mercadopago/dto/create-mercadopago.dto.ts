import { IsOptional, IsString } from "class-validator";
import { CreateProductDto } from "src/products/dto/create-product.dto";

export class CreateMercadopagoDto {
   @IsOptional()
    cart: Product[]
    @IsOptional()
    user: User
}

export interface Product {
    title: string;
    unit_price: Number
    currency_id: string;
    quantity: Number

}

interface User {
    name: string;
    surname: string;
    email: string;
    phone: FormatPhone
}

interface FormatPhone {

    area_code: string;
    number: number;

}
