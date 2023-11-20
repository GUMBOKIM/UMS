import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

export enum CompanyType {
    SUPPLIER = 'SUPPLIER',
    PROVIDER = 'PROVIDER',
    CUSTOMER = 'CUSTOMER'
}

@Entity()
export class Company {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column({
        type:'enum',
        enum: CompanyType,
    })
    type: CompanyType

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date | null
}