import { ProductEntity } from "src/products/entities/product.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";


@Entity({name:'categories'})
export class CatagoryEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column()
    description:string;

    @CreateDateColumn()
    createdAt:Timestamp


    @UpdateDateColumn()
    updatedAt:Timestamp


    @ManyToOne(()=>UserEntity,(user)=>user.catagories)
    addedby:UserEntity;


    @OneToMany(()=>ProductEntity,(pro)=>pro.category)
    products:ProductEntity




}

// one user multiple catagory 