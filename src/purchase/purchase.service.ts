import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
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
    console.log("ingreso a crear purchase", createPurchaseDto);

    
    try {
   let {product} ={ ...createPurchaseDto} 
    createPurchaseDto.product=[];
    let payment: number;
    let responseProducts=[] = await this.productsService.searchProducts(product)
console.log("productos buscados",responseProducts);
/* for (let j = 0; j < responseProducts.length; j++) {
 payment= responseProducts[j]?.price * createPurchaseDto.quantity[j];

  
}
const newuser= await this.userService.findOneUser(createPurchaseDto.user.id)
console.log("usuaro encontrado y retornado para el controller usuario", newuser); */


const productDto : CreatePurchaseDtoFormat={
  date: new Date(),

product:responseProducts,

//user:  newuser[0],


total: createPurchaseDto.total

}
console.log("lo que voy a guardar", productDto);

//createPurchaseDto.product=responseProducts;
const newpurchase= this.purchaseRepository.create(productDto)
console.log("PURCHASE A GUARDAR", newpurchase);



await this.purchaseRepository.save(newpurchase)


 
      return newpurchase;
      
    } catch (error) {
      this.handleDBExeptions(error)
      
    }
  }
  private handleDBExeptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail)
      this.logger.error(error);
      throw new InternalServerErrorException('Unexpected error, check server logs');
            
    }
  }

  async findAll() {
    console.log("ingreso a service");
    
    return await this.purchaseRepository.find({relations:['product']});
  }

 async findOne(id: any){
  
  const purchase = await this.purchaseRepository.findOne({where:{id:id},relations:{product : true}});
console.log("purchase encontrado en SErvice",purchase);

  return purchase;
  }


  remove(id: string) {
    this.purchaseRepository.delete(id)
   }
  }
/* 
  update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    return `This action updates a #${id} purchase`;
  } */

  

