import { Injectable, Param } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
constructor(
  @InjectRepository(Category) 
  private categoryRepository:  Repository<Category>){
 
}


 async  createCategory(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepository.create(createCategoryDto)

    console.log("veo categoria",category);
    
    await this.categoryRepository.save(category);
    return category;

  }

  async findAllCategory() {
    return await this.categoryRepository.find();
  }

 async findOneCategory( id: string) {
    return await this.categoryRepository.findOneBy({id})
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
