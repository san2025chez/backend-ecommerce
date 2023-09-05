import { IsDate, IsOptional } from "class-validator";
import { Product } from "../../products/entities";
import { User } from "../../users/entities/users.entity";

export class CreatePurchaseDtoFormat {

@IsOptional()
date: Date;
@IsOptional()
product?: Product[];
@IsOptional()
user?:  User;

@IsOptional()
total:number;

}