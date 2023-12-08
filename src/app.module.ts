import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { PurchaseModule } from './purchase/purchase.module';
import { CommonModule } from './common/common.module';
/* import { PaymentModule } from './payment/payment.module'; */
import { PurchaseController } from './purchase/purchase.controller';
import { loggers } from '../midleware/midleware';
import { AuthModule } from './auth/auth.module';
import { MercadopagoModule } from './mercadopago/mercadopago.module';
console.log("tipo",typeof(process.env.DB_PASSWORD));
  

@Module({
  imports:[
  ConfigModule.forRoot({
    envFilePath:`.${process.env.NODE_ENV}.env`,
    isGlobal:true
  }),

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
  CommonModule,
 /*  PaymentModule, */
  AuthModule,
  MercadopagoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
  consumer
  .apply(loggers)
  .forRoutes({ path: 'purchase', method: RequestMethod.POST});
  }
}