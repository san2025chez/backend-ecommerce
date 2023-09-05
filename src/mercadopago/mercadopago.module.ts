import { Module } from '@nestjs/common';
import { MercadopagoService } from './mercadopago.service';
import { MercadopagoController } from './mercadopago.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mercadopago } from './entities/mercadopago.entity';
import { PurchaseModule } from '../purchase/purchase.module';


@Module({
  imports: [
  TypeOrmModule.forFeature([Mercadopago]),
    PurchaseModule
   
  ],
  controllers: [MercadopagoController],
  providers: [MercadopagoService]
})
export class MercadopagoModule {}
