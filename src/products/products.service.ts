import { BadRequestException, Body, Injectable, ParseUUIDPipe, Post, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { ProductImage } from './entities';
import { Product } from './entities/product.entity';
import { User } from '../users/entities/users.entity';
import { ILike } from 'typeorm';


@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService')
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,

    private readonly dataSource: DataSource,
  ) { }

  async create(createProductDto: CreateProductDto) {
    try {
      const { images = [], ...productDetails } = createProductDto;

      const product = this.productRepository.create({
        ...productDetails,

        images: images.map(image => this.productImageRepository.create({ url: image }),
        )
      });



      await this.productRepository.save(product);
      return { ...product, images: images };
      //return product;
    } catch (error) {
      this.handleDBExeptions(error)

    }


  }

  async findAll() {
    // const { limit = 10, offset = 0 } = paginationDto;
    const products = await this.productRepository.find({
      //take: limit,
      //skip: offset,
      relations: 
         ['images', 'category']
    });
return products;

    /* return products.map((product) => ({
      ...product,
      images: product.images.map(img => img.url)
    })) */
  }

  async findOne(id: string) {

    let product = await this.productRepository.findOneBy({id});
    return product;
  }

  async findOneByName(searchTerm: string) {

    const products = await this.productRepository.find({
      where: {

        name: ILike(`%${searchTerm}%`), // Usamos '% palabra %' para buscar productos que contienen la palabra

      },
    });



    return products;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {

    const { images, ...toUpdate } = updateProductDto;
    const product = await this.productRepository.preload({ id, ...toUpdate });

    if (!product) throw new NotFoundException(`Product with id: ${id} not found`)


    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();


    try {

      if (images) {
        await queryRunner.manager.delete(ProductImage, { product: { id } })
        product.images = images.map(
          image => this.productImageRepository.create({ url: image })
        )
      } else {

      }
      /* s */
      await queryRunner.manager.save(product);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      //return product;
    const updateProduct= await this.productRepository.save(product)
    return updateProduct;

    } catch (error) {

      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExeptions(error);

    }


  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  private handleDBExeptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail)
      this.logger.error(error);

    }
  }

  public async searchProducts(ids: string[]) {
    let products = []
    for (let i = 0; i < ids.length; i++) {
      let product = await this.findOne(ids[i]);
      products.push(product)

    }


    if (products) {
      return products;

    }
  }
}
