import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { UserEntity } from '../../users/entities/user.entity';
import { CatagoryEntity } from "src/catagories/entities/catagory.entity";
import { ReviewEntity } from "src/reviews/entities/review.entity";

@Entity({name:'products'})
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @IsNotEmpty()
    title:string;
    
    @Column()
    @IsNotEmpty()
    description:string;
    
    @Column({type:'decimal',precision:10,scale:2,default:0})
    @IsNotEmpty()
    price:number;
    
    @Column()
    @IsNotEmpty()
    stock:number;


    @Column('simple-array')
    images:string[];

    @CreateDateColumn()
    createdAt:Timestamp;

    @UpdateDateColumn()
    updatedAt:Timestamp;

    @ManyToOne(()=>UserEntity,(user)=>user.products)
    addedBy:UserEntity


    @ManyToOne(()=>CatagoryEntity,(cat)=>cat.products)
    category:CatagoryEntity



    @ManyToOne(()=>ReviewEntity,(rev)=>rev.product)
    reviews:ReviewEntity[]












}

