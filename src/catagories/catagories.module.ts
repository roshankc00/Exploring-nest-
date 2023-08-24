import { Module } from '@nestjs/common';
import { CatagoriesService } from './catagories.service';
import { CatagoriesController } from './catagories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatagoryEntity } from './entities/catagory.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CatagoryEntity])],
  controllers: [CatagoriesController],
  providers: [CatagoriesService],
  exports:[CatagoriesService]
})
export class CatagoriesModule {}
