import { Purchase } from "../../purchase/entities/purchase.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Mercadopago {
  
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    status: string;

    @Column('timestamp')
    fecha: Date;

    @OneToOne(() => Purchase, (purchase) => purchase.mercadopago)
    @JoinColumn()
    purchase?: Purchase;

}
