import { Injectable, Logger } from '@nestjs/common';
import { CreateMercadopagoDto, Product } from './dto/create-mercadopago.dto';
import { UpdateMercadopagoDto } from './dto/update-mercadopago.dto';
import  pg from 'pg';
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

  private readonly logger= new Logger('MercadopagoService')
  constructor(
    @InjectRepository(Mercadopago)
    private mercadoRepository: Repository<Mercadopago>,

    private purchaseService: PurchaseService
 ){}

 async create(data: any) {
   
    
   
    console.log("cartsssss que llegan al BACK",data);
    orden= data.orden;

    /* 
      cart: [
    {
      id: '06206622-45a6-47fb-8d5d-e390a58e0a34',
      name: 'One C Mix',
      descriptions: 'One C Mix de omnilife es un suplemento nutricional con delicioso sabor a mango verde que contiene: L-Glutatión, cisteína, vitamina A, complejo B: tiamina B1, riboflavina B2, niacina B3, ácido pantoténico B5, piridoxina B6, biotina, ácido fólico B9, B12, vitaminas C, D, E y K además de minerales como el calcio, su principal función es fortalecer el sistema Respiratorio y el sistema inmunológico.',
      stock: '55',
      price: '11370',
      images: [Array],
      user: [Object],
      quantity: 1
    } */
let arrayProduct=[];

    for (let i = 0; i< data.cart.length; i++) {

      const products : Product={
        title: data.cart[i].name,
        unit_price: Number(data.cart[i].price),
        currency_id: "ARS",
        quantity: Number(data.cart[i].quantity)
      }
   arrayProduct.push(products)
       }

    data.cart[0].title= data.cart[0].name;

    /* const product : CreateMercadopagoDto={
      cart: [{
        title:"",
        unit_price: 3,
        currency_id:" string;"
      }],
      user:{
        name: "string",
        surname: "string",
        email: "string;",
        phone:{
          area_code: "388",
    number:33333
        }

      }

    } */
    
/* 
    let carton: Object[];
    carton= data.cart
    console.log("cart asignado",typeof(carton));
    const user = data.user;
   let dats : CreateMercadopagoDto;
   dats.cart= data.cart;
   console.log("CARTS", dats.cart);
   console.log("CARTS",typeof(dats.cart));
    */

 
    mercadopago.configure({
      access_token: process.env.TEST
    });

console.log("COMPRUEBO LO QUE ENVIO",arrayProduct);
console.log( data.user.name,
  data.orden.user.surname,
 data.orden.user.email,
 data.orden.user.phone);




    try {
      const result = await mercadopago.preferences.create({
        items: arrayProduct,
        payer: {
          name: data.orden.user.name,
          surname: data.orden.user.surname,
          email: data.orden.user.email,
          phone: {
            area_code: "54",
            number: Number(data.orden.user.phone)
          },
        },
        payment_methods: {
  
          installments: 1
        }, 
        /*    items: [
             {
        
               currency_id: 'ARS',
               
               title: 'Thermogen',
            
               unit_price: 26,
               quantity: 1
             },
           ],*/

          notification_url: "https://productosnutricionales.online/api/mercadopago/webhook",
     // notification_url: "https://pagos-h22l.onrender.com/webhook",
        back_urls: {
          success: "https://productosnutricionales.online", 

          // pending: "https://e720-190-237-16-208.sa.ngrok.io/pending",
          // failure: "https://e720-190-237-16-208.sa.ngrok.io/failure",
        },
     });
  
/*   console.log("veo resultado",JSON.stringify(result.body)); */
  
  return JSON.stringify(result.body)
      // res.json({ message: "Payment creted" });
     // res.json(result.body);
      
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
  console.log("pagos",payment);
  console.log("pagos type",payment.type);
  console.log("pagos data",payment["data.id"]);
  console.log("pagos datasss forzado",payment["data"]);
  
      if (payment.type === "payment") {
        console.log("ingreso");
let id = payment.data.id;
console.log("ID PAY",id);

        
        const dataMp = await mercadopago.payment.findById(id);
  /*        console.log("Guardo en BD",data.body.status);
           console.log("Guardo en BD",dataMp.body.status_detail); */

           let datapayment: CreatePayDto={

            status: dataMp.body.status_detail,
            purchase: orden,
    
         /*    purchase: this.purchaseService.findOne(orden.id), */
            fecha: new Date()


           }
          
           


        let pay= await  this.mercadoRepository.create(datapayment);
         console.log("lo que guardo", pay);
         
           this.mercadoRepository.save(pay)


    
           
    /*        const connection = new pg.Pool({
               connectionString:'postgres://postgress:q7In0K7ru4K2GZ0VBCWD6QJEV0ph5NzU@dpg-cihnjpdgkuvojja6ed90-a.ohio-postgres.render.com/paybasedato23',
               ssl: true
           });
      
           connection.connect() */
    /*     .then(() => { */


          
        /*   console.log('Conexión exitosa a la base de datos PostgreSQL');
          connection.query('INSERT INTO pagos ( status) VALUES ($1)',
          [ data.body.status_detail], (error, result) => {
           if (error) {
             console.error('Error al guardar datos:', error);
             res.status(500).json({ error: 'Error al guardar datos' });
           } else {
             console.log('Datos guardados correctamente');
              res.json({ mensaje: 'Datos guardados correctamente' });
          }}) */
   /*      })
        .catch((err) => {
          console.error('Error al conectar a la base de datos:', err);
        });
      */
      }
  
  
    } catch (error) {
  console.log(error);
  
      /* return res.status(500).json({ message: "Something goes wrong" }); */
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
