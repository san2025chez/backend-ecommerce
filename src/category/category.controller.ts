import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ParseUUIDPipe } from '@nestjs/common';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    const category = this.categoryService.createCategory(createCategoryDto);
    return category;

  }

  @Get()
  findAll() {
    return this.categoryService.findAllCategory();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const category = this.categoryService.findOneCategory(id);
    console.log("DATA POR CATegoria",category);
    
    return category;

    if (!category)
      throw new NotFoundException(`Category ${id} not found`)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
