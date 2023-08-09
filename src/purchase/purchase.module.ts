import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { Product } from '../products/entities';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';
@Module({
  imports:[
TypeOrmModule.forFeature([Purchase]),
ProductsModule, UsersModule],
  controllers: [PurchaseController],
  providers: [PurchaseService],

})
export class PurchaseModule {}
