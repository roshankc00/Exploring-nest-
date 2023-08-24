import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CatagoriesService } from '../catagories/catagories.service';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(ProductEntity) private productRepository:Repository<ProductEntity>,private readonly catagoriesService:CatagoriesService){}
  async create(createProductDto: CreateProductDto,currentUser:UserEntity) {
    const product= this.productRepository.create(createProductDto)
    const category=await this.catagoriesService.findOne(+createProductDto.categoryId)
    product.category=category;
    product.addedBy=currentUser
    return await this.productRepository.save(product) ;
  }

  async findAll():Promise<ProductEntity[]> {
    return await this.productRepository.find({
      relations:{addedBy:true,category:true},
      select:{
        addedBy:{
          id:true,
          name:true,
          email:true
        },
        category:{
          id:true,
          title:true,
          description:true
        }
      }
     
      
    
    });
  }

  async findOne(id:number):Promise<ProductEntity> {
    const product= await this.productRepository.findOne({
      where:{id:id},
      relations:{
        addedBy:true,        
        category:true
       
      },
      select:{
        addedBy:{
          id:true,
          name:true,
          email:true
        },
        category:{
          id:true,
          title:true,
          description:true
        }
      }

    

    });

    if(!product){
      throw new NotFoundException("no product exists with this id ")
    }
    return product;

  }




 async  update(id: any, updateProductDto:Partial<UpdateProductDto>,currentUser:UserEntity) {
  const product=await this.findOne(id);
  console.log(product,"kmdkmd")
  Object.assign(product,updateProductDto)
  product.addedBy=currentUser
  if(updateProductDto.categoryId){
    const category=await this.catagoriesService.findOne(+updateProductDto.categoryId)
    console.log(category,"kdmfkmd")
    if(category){

      product.category=category

    }else{
      throw new BadRequestException("category with this id doeesnt exist")
    }


  }

  return await this.productRepository.save(product) ;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
