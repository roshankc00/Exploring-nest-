import { Injectable , NotFoundException} from '@nestjs/common';
import { CreateCatagoryDto } from './dto/create-catagory.dto';
import { UpdateCatagoryDto } from './dto/update-catagory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CatagoryEntity } from './entities/catagory.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class CatagoriesService {
  constructor(@InjectRepository(CatagoryEntity) private readonly categoryRepository:Repository<CatagoryEntity> ){}







  async create(createCatagoryDto: CreateCatagoryDto,currentUser:UserEntity):Promise<CatagoryEntity> {
   const category= this.categoryRepository.create(createCatagoryDto)
   category.addedby=currentUser
   return await  this.categoryRepository.save(category);
  }

  async findAll():Promise<CatagoryEntity[]> {
    return await this.categoryRepository.find({
     relations:{addedby:true},
     select:{
      addedby:{
        id:true,
        email:true,
        name:true
      }
     }
    });
  }

  

 async  findOne(id: number):Promise<CatagoryEntity> {
    return this.categoryRepository.findOne(
      {
        where:{id:id},
        relations:{addedby:true},
        select:{
          addedby:{
            id:true,
            name:true,
            email:true
          }
        }
      }
    );
  }

  async update(id: number, fields: Partial<UpdateCatagoryDto>) {
    const category=await this.categoryRepository.findOneBy({id})
    if(!category){
    throw new NotFoundException({message:"category not found"})
    }
   const final= Object.assign(category,fields)
    return await this.categoryRepository.save(final)
  }

  remove(id: number) {
    return `This action removes a #${id} catagory`;
  }




}
