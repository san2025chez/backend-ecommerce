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
  private readonly logger = new Logger('PurchaseService')
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
    private productsService: ProductsService,
    private userService: UsersService) { }

  async create(createPurchaseDto: CreatePurchaseDto) {

    try {
      let { product } = { ...createPurchaseDto }
      createPurchaseDto.product = [];
      let payment: number;
      let responseProducts = [] = await this.productsService.searchProducts(product)



      const productDto: CreatePurchaseDtoFormat = {
        date: new Date(),

        product: responseProducts,

        user: createPurchaseDto.user,


        total: createPurchaseDto.total

      }


      //createPurchaseDto.product=responseProducts;
      const newpurchase = this.purchaseRepository.create(productDto)




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


    return await this.purchaseRepository.find({ relations: ['product'] });
  }

  async findOne(id: any) {

    const purchase = await this.purchaseRepository.findOne({
      where: { id: id },
      relations: ['product', 'user']
    });


    return purchase;
  }


  remove(id: string) {
    this.purchaseRepository.delete(id)
  }
}




