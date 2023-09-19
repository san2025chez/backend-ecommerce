
import { Product } from "../../products/entities";
import { User } from "../../users/entities/users.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { isGeneratorObject } from "util/types";
import { Mercadopago } from '../../mercadopago/entities/mercadopago.entity';

@Entity()
export class Purchase {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: Date, default: new Date, nullable: true })
    date: Date;

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    total: number

    @ManyToMany(() => Product,
        (product: Product) => product.purchase,
        {
            cascade: true
        })
    @JoinTable(
        {
            name: 'DETALLES',
            joinColumns: [{ name: 'purchaseId', referencedColumnName: 'id' }],
            inverseJoinColumns: [{ name: 'productId', referencedColumnName: 'id' }]
        }
    )
    product?: Product[];

    @ManyToOne(() => User, (user) => user.purchase)
    user?: User;

    @OneToOne(() => Mercadopago, (mercadopago) => mercadopago.purchase)
    mercadopago?: Mercadopago;

}
