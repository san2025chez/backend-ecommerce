import { Purchase } from '../../purchase/entities/purchase.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm'
import { Product } from '../../products/entities/product.entity';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;


    @Column('text', {

        unique: true
    })
    email: string;

    @Column('text', {
        select: false
    })
    password: string;

    @Column({
        type: 'text',
        default: null
    })
    surname: string;

    @Column({
        type: 'text',
        default: null
    })
    barrio?: string;

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

    @Column({
        type: 'text',
        default: null
    })
    phone?: string;

    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }

    @OneToOne(() => Purchase, (purchase) => purchase.user)
    purchase?: Purchase

    @OneToMany(
        () => Product,
        (product) => product.user)
    product: Product

}