import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CurrentUser } from 'src/utils/decorators/currentUser.Decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthenticationGuard } from 'src/utils/guards/authenticationguard';
import { Roles } from 'src/utils/common/user-roles-enum';
import { AuthorizationGuard } from 'src/utils/guards/authorization.guard';
import { ProductEntity } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(AuthenticationGuard,AuthorizationGuard([Roles.USER]))

  create(@Body() createProductDto: CreateProductDto,@CurrentUser() currentUser:UserEntity) {
    return this.productsService.create(createProductDto,currentUser);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: number):Promise<ProductEntity> {
    return await this.productsService.findOne(+id);
  }
 
  @Patch(':id')
  @UseGuards(AuthenticationGuard,AuthorizationGuard([Roles.USER]))
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto,@CurrentUser() currentUser:UserEntity) {
    return this.productsService.update(+id, updateProductDto,currentUser);
  }


}
