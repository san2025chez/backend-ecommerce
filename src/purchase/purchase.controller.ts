import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}


  @Post('create')
  create(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.create(createPurchaseDto);
  }

  @Get()
  findAll() {
    return this.purchaseService.findAll();
  }

 @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    const productos=  this.purchaseService.findOne(id);
  return productos;
  }
/*  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurchaseDto: UpdatePurchaseDto) {
    return this.purchaseService.update(+id, updatePurchaseDto);
  }
 */
  @Delete(':id')
  remove(@Param('id' , ParseUUIDPipe) id: string) {
    return this.purchaseService.remove(id);
  }
}
