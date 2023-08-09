import { Purchase } from '../../purchase/entities/purchase.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm'

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text')
    surname: string;

    @Column({
        type: 'text',
        default: null
    })
    barrio: string;

    @Column({
        type: 'text',
        default: null
    })
    calle?: string;

    @Column({
        type: 'text',
        default: null
    })
    localidad?: string;

    @Column('text')
    phone: string;

    @OneToOne(() => Purchase, (purchase) => purchase.user)
    purchase: Purchase

}