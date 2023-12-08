import { Product } from "../../products/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('')
export class Category {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type:'text'
    })
    name: string

    @OneToMany(
        () => Product,
        (product) => product.category,
        {cascade : true, eager: true}
    )
    product?: Product[]


}
