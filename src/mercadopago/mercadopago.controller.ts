import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MercadopagoService } from './mercadopago.service';
import { CreateMercadopagoDto } from './dto/create-mercadopago.dto';
import { UpdateMercadopagoDto } from './dto/update-mercadopago.dto';

@Controller('mercadopago')
export class MercadopagoController {
  constructor(private readonly mercadopagoService: MercadopagoService) {}

  @Post()
  create(@Body() createMercadopagoDto: any) {
    console.log("ingreso a crear",createMercadopagoDto
    );
    
    return this.mercadopagoService.create(createMercadopagoDto);
  }

   @Post('/webhook')
  createpayments(@Body() data: any) {
    console.log("ingreso a webhook");
    
    return this.mercadopagoService.receiveWebhook(data);
  }

  @Get()
 async findOne() {
    return  await this.mercadopagoService.findAll();
  }
/*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMercadopagoDto: UpdateMercadopagoDto) {
    return this.mercadopagoService.update(+id, updateMercadopagoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mercadopagoService.remove(+id);
  } */
}
