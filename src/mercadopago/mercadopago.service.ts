import { Injectable, Logger } from '@nestjs/common';
import { CreateMercadopagoDto, Product } from './dto/create-mercadopago.dto';
import { UpdateMercadopagoDto } from './dto/update-mercadopago.dto';
import pg from 'pg';
import { CreatePayDto } from './dto/create-pay.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Mercadopago } from './entities/mercadopago.entity';
import { Repository } from 'typeorm';
import { Purchase } from '../purchase/entities/purchase.entity';
import { PurchaseService } from '../purchase/purchase.service';


var mercadopago = require('mercadopago');
var orden: Purchase;

@Injectable()
export class MercadopagoService {

  private readonly logger = new Logger('MercadopagoService')
  constructor(
    @InjectRepository(Mercadopago)
    private mercadoRepository: Repository<Mercadopago>,

    private purchaseService: PurchaseService
  ) { }

  async create(data: any) {

    orden = data.orden;

    let arrayProduct = [];

    for (let i = 0; i < data.cart.length; i++) {

      const products: Product = {
        title: data.cart[i].name,
        unit_price: Number(data.cart[i].price),
        currency_id: "ARS",
        quantity: Number(data.cart[i].quantity)
      }
      arrayProduct.push(products)
    }

    data.cart[0].title = data.cart[0].name;

    mercadopago.configure({
      access_token: process.env.TEST
    });


    try {
      if (data && data.orden) {
        const result = await mercadopago.preferences.create({
          items: arrayProduct,
          payer: {
            name: data?.orden?.user.name,
            surname: data?.orden?.user.surname,
            email: data?.orden?.user.email,
            phone: {
              area_code: "54",
              number: Number(data?.orden?.user.phone)
            },
          },
          payment_methods: {

            installments: 1
          },


          notification_url: "https://productosnutricionales.online/api/mercadopago/webhook",

          back_urls: {
            success: "https://productosnutricionales.online",
          },
        });

        return JSON.stringify(result.body)

      }

    } catch (error) {
      console.log("ingreso por aqui");

      console.log(error);

    }


  }

  receiveWebhook = async (req) => {
    console.log("lo que llega de webhook query", req.query);
    console.log("lo que llega de webhook", req);


    try {
      const payment = req;
      console.log("pagos", payment);
      console.log("pagos type", payment.type);
      console.log("pagos data", payment["data.id"]);
      console.log("pagos datasss forzado", payment["data"]);

      if (payment.type === "payment") {
        console.log("ingreso");
        let id = payment.data.id;
        console.log("ID PAY", id);


        const dataMp = await mercadopago.payment.findById(id);

        let datapayment: CreatePayDto = {

          status: dataMp.body.status_detail,
          purchase: orden,

          fecha: new Date()

        }

        let pay = await this.mercadoRepository.create(datapayment);
        console.log("lo que guardo", pay);

        this.mercadoRepository.save(pay)

      }


    } catch (error) {
      console.log(error);
    }
  };

  async findAll() {
    return await this.mercadoRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} mercadopago`;
  }

  update(id: number, updateMercadopagoDto: UpdateMercadopagoDto) {
    return `This action updates a #${id} mercadopago`;
  }

  remove(id: number) {
    return `This action removes a #${id} mercadopago`;
  }
}
