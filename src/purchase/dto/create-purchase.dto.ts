import { IsDate, IsOptional } from "class-validator";
import { Product } from "../../products/entities";
import { User } from "../../users/entities/users.entity";

export class CreatePurchaseDto {
 readonly id: string;
@IsOptional()
date: Date;
@IsOptional()
product?: string[];
@IsOptional()
user?:  User;
@IsOptional()
quantity: number[];
}
