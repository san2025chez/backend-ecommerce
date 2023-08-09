import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { ProductsService } from '../products/products.service';
import { CreatePurchaseDtoFormat } from './dto/create-product-formato';
import { UsersService } from '../users/services/users.service';

@Injectable()
export class PurchaseService {
  private readonly logger= new Logger('PurchaseService')
constructor( 
   @InjectRepository(Purchase) 
   private purchaseRepository: Repository<Purchase>,
   private productsService: ProductsService,
   private userService: UsersService)
   {}

 async create(createPurchaseDto: CreatePurchaseDto) {
    console.log("ingreso a crear");
    try {
   let {product} ={ ...createPurchaseDto} 
    createPurchaseDto.product=[];
    let payment: number;
    let responseProducts = await this.productsService.searchProducts(product)
console.log(responseProducts);
for (let j = 0; j < responseProducts.length; j++) {
 payment= responseProducts[j]?.price * createPurchaseDto.quantity[j];
  console.log("pago",payment
  );
  
}
const newuser= await this.userService.findOneUser(createPurchaseDto.user)
console.log("USER", newuser[0]);

const productDto : CreatePurchaseDtoFormat={
  date: new Date(),

product:responseProducts,

user:  newuser[0],

quantity: createPurchaseDto.quantity

}
//createPurchaseDto.product=responseProducts;
const newpurchase= await this.purchaseRepository.create(productDto)
this.purchaseRepository.save(newpurchase)

     // const purchase=  this.purchaseRepository.create(createPurchaseDto);
     // await  this.purchaseRepository.save(purchase)
      return newpurchase;
      
    } catch (error) {
      this.handleDBExeptions(error)
      
    }
  }
  private handleDBExeptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail)
      this.logger.error(error);

    }
  }

  async findAll() {
    console.log("ingreso a service");
    
    return await this.purchaseRepository.find({relations:['product']});
  }

  findOne(id: number) {
    return `This action returns a #${id} purchase`;
  }

  update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    return `This action updates a #${id} purchase`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchase`;
  }
}
