import {
    Column, Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryColumn, PrimaryGeneratedColumn
} from "typeorm";

import { Category } from "../../category/entities/category.entity";
import { Purchase } from "../../purchase/entities/purchase.entity";

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'text'
    })
    name: string;

    @Column({
        type: 'text'
    })
    descriptions?: string;

    @Column({
        type: 'numeric'
    })
    stock: number;

    @Column({
        type: 'text'
    })
    price: number;
    //image
/*     @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        { cascade: true, eager: true }
    )
    images?: ProductImage[]; */

    @ManyToOne(
        () => Category,
        (category) =>  category.product,
         {onDelete: 'CASCADE'}
    
        )
    category: Category;

    @ManyToMany(() => Purchase,
    (purchase: Purchase) => purchase.product)
  
    purchase: Purchase[]


}
