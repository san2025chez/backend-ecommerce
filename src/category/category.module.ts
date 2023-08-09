import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities';
import { Category } from './entities/category.entity';

@Module({
  imports:[
 TypeOrmModule.forFeature([Category, Product])
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
