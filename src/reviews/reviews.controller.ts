import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { CurrentUser } from 'src/utils/decorators/currentUser.Decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { ReviewEntity } from './entities/review.entity';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Body() createReviewDto: CreateReviewDto ,@CurrentUser() currentUser:UserEntity) {
    return this.reviewsService.create(createReviewDto,currentUser);
  }

  @Get('/all')
  findAll():Promise<ReviewEntity[]> {
    return this.reviewsService.findAll();
  }
  @Get()
  async findAllByProduct(@Body('productId') productId:number):Promise<ReviewEntity[]> {
    return this.reviewsService.findByProduct(productId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string):Promise<ReviewEntity> {
    return await this.reviewsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
