import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, NotFoundException, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Auth } from '../auth/decorators/auth.decorators';
import { ValidRoles } from '../auth/interfaces';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  /*   @Auth() */

  create(@Body() createProductDto: CreateProductDto,
    // @GetUser() user: User
  ) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':name')
  async findOne(@Param('name') name: string) {
    let product;
   product = await this.productsService.findOneByName(name);
    if (!product)
      throw new NotFoundException(`Product with id ${name} not found`)
    return product;
  }

  @Get('git:id')
  async findOnebyId(@Param('id', ParseUUIDPipe) id: string) {
    let product;
   product = await this.productsService.findOne(id);
    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`)
    return product;
  }


  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
    /*   @GetUser() user:User */

  ) {
    console.log("ingreso a update");

    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
