import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewEntity } from './entities/review.entity';
import { ProductsService } from 'src/products/products.service';
import { AuthenticationGuard } from 'src/utils/guards/authenticationguard';
import { AuthorizationGuard } from '../utils/guards/authorization.guard';
import { Roles } from 'src/utils/common/user-roles-enum';

@Injectable()
export class ReviewsService {
  constructor(@InjectRepository(ReviewEntity) private readonly reviewRepositary:Repository<ReviewEntity>, private readonly productService:ProductsService){}



  async create(createReviewDto: CreateReviewDto,currentUser:UserEntity):Promise<ReviewEntity> {
    const product=await this.productService.findOne(+createReviewDto.productId)
    let review=await this.findOneByUserAndProduct(currentUser.id,createReviewDto.productId)
    if(!review){
      review=this.reviewRepositary.create(createReviewDto);
      review.user=currentUser;
      review.product=product;     

    }else{
      review.comment=createReviewDto.comment,
      review.ratings=createReviewDto.ratings
    }



    // const review=this.create(createReviewDto);
  
    return this.reviewRepositary.save(review) ;
  }

  async findAll():Promise<ReviewEntity[]> {
    return await this.reviewRepositary.find();
  }


async findByProduct(id:number):Promise<ReviewEntity[]>{
  const product=await this.productService.findOne(id);
  console.log(product)
  return await this.reviewRepositary.find({
    where:{
      product:{id:id}
    },
    relations:{
      user:true,
      product:{
        category:true
      }
      
    }
    
  })





}  

  async findOne(id:number):Promise<ReviewEntity> {
    const review=await this.reviewRepositary.findOne({
      where:{id},
      relations:{
        user:true,
        product:{
          category:true
        }
        
      }

    });
    if(!review){
      throw new NotFoundException("review not found")
    }
    return review;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    console.log(updateReviewDto)
    return `This action updates a #${id} review`;
  }
  
  @UseGuards(AuthenticationGuard,AuthorizationGuard([Roles.USER]))
 async  remove(id: number) {
    const review=await this.findOne(id);
    return await  this.reviewRepositary.remove(review);
  }


  async findOneByUserAndProduct(userId:number,productId:number){
    return await this.reviewRepositary.findOne({
      where:{
        user:{
          id:userId
        },
        product:{
          id:productId
        }
      },
      relations:{
        user:true,
        product:{
          category:true
        }
      }
    })
  }
}


