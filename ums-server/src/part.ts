import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Part {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    supplierCode!: string

    @Column()
    providerCode: string

    @Column()
    customerCode: string

    @Column({ nullable: true })
    providerName?: string

    @Column({nullable: true})
    supplierName?: string

    @Column({nullable: true})
    customerName?: string

    @Column({nullable: true})
    memo?: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date | null
}