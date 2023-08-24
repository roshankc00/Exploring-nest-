import { CatagoryEntity } from 'src/catagories/entities/catagory.entity';
import {  ProductEntity } from 'src/products/entities/product.entity';
import { ReviewEntity } from 'src/reviews/entities/review.entity';
import { Roles } from 'src/utils/common/user-roles-enum';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from 'typeorm';
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({unique:true})
  email: string;

  @Column({select:false})
  password:string;

  @Column({type:'enum',enum:Roles,array:true,default:[Roles.USER]})
  roles:Roles[];

  @CreateDateColumn()
  createdAt:Timestamp

  @UpdateDateColumn()
  updatedAt:Timestamp

  @OneToMany(()=>CatagoryEntity,(cat)=>cat.addedby)
  catagories:CatagoryEntity[];

  @OneToMany(()=>ProductEntity,(pro)=>pro.addedBy)
  products:ProductEntity[]

  @OneToMany(()=>ReviewEntity,(review)=>review.user)
  reviews:ReviewEntity[]


}
