import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { PurchaseModule } from './purchase/purchase.module';
import { CommonModule } from './common/common.module';

@Module({
  imports:[
    ConfigModule.forRoot(),
  TypeOrmModule.forRoot({
    type:'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database : process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    autoLoadEntities: true,
    synchronize: true,

  }),
  UsersModule,
  ProductsModule,
  CategoryModule,
  PurchaseModule,
  CommonModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
