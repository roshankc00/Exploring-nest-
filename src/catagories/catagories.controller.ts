import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CatagoriesService } from './catagories.service';
import { CreateCatagoryDto } from './dto/create-catagory.dto';
import { UpdateCatagoryDto } from './dto/update-catagory.dto';
import { AuthenticationGuard } from 'src/utils/guards/authenticationguard';
import { AuthorizationGuard } from 'src/utils/guards/authorization.guard';
import { Roles } from 'src/utils/common/user-roles-enum';
import { CurrentUser } from 'src/utils/decorators/currentUser.Decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { CatagoryEntity } from './entities/catagory.entity';

@Controller('catagories')
export class CatagoriesController {
  constructor(private readonly catagoriesService: CatagoriesService) {}
  @Post()
  @UseGuards(AuthenticationGuard,AuthorizationGuard ([Roles.USER]))
  async create(@Body() createCatagoryDto: CreateCatagoryDto, @CurrentUser() currentUser:UserEntity):Promise<CatagoryEntity>{
    return await this.catagoriesService.create(createCatagoryDto,currentUser);
  }

  @Get()
  
  async findAll():Promise<CatagoryEntity[]> {
    return await this.catagoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string):Promise<CatagoryEntity> {
    return await this.catagoriesService.findOne(+id);
  }
 

  @UseGuards(AuthenticationGuard,AuthorizationGuard ([Roles.USER]))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCatagoryDto: UpdateCatagoryDto) {
    return await  this.catagoriesService.update(+id, updateCatagoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catagoriesService.remove(+id);
  }
}
