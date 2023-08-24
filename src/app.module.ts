import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datasourceOptions } from 'database/data-source';
import { UsersModule } from './users/users.module';
import { currentUserMiddleware } from './utils/middlewares/current-user.middleware';
import { CatagoriesModule } from './catagories/catagories.module';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [TypeOrmModule.forRoot(datasourceOptions),  UsersModule, CatagoriesModule, ProductsModule, ReviewsModule],
  controllers: [],
  providers: [],
})
  export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(currentUserMiddleware)
        .forRoutes({path:'*',method:RequestMethod.ALL});
    }
  }

