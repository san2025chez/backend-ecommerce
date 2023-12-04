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
    
    await this.categoryRepository.save(category);
    return category;

  }

  async findAllCategory() {
    return await this.categoryRepository.find();
  }

 async findOneCategory( name: string) {
    const category= await this.categoryRepository.find({where:{name:name}, relations:{product: true}})

  
    return category;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async remove(id: string) {
    await this.categoryRepository.delete(id)
  }
}
