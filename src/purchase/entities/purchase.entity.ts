import { Product } from "../../products/entities";
import { User } from "../../users/entities/users.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { isGeneratorObject } from "util/types";

@Entity()
export class Purchase {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: Date, default: new Date, nullable: true })
    date: Date;

    @Column('decimal', { precision: 10, scale: 2, nullable:true })
    payment: number

    @ManyToMany(() => Product,
     (product: Product) => product.purchase,{
        cascade: true
     })
    @JoinTable(
        {
            name:'DETALLES',
            joinColumns: [{ name:'purchaseId', referencedColumnName:'id'}],
            inverseJoinColumns: [{name:'productId' , referencedColumnName:'id'}],
        }
    )
    product: Product[];

    @OneToOne(() => User, (user) => user.purchase)
    user?: User;

}
