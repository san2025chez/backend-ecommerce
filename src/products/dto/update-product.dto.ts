import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';


export class UpdateProductDto extends PartialType(CreateProductDto) {
    category: Category;
}

interface Category {
    id:string;
    name: string
}