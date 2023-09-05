import { Test, TestingModule } from '@nestjs/testing';
import { MercadopagoController } from './mercadopago.controller';
import { MercadopagoService } from './mercadopago.service';

describe('MercadopagoController', () => {
  let controller: MercadopagoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MercadopagoController],
      providers: [MercadopagoService],
    }).compile();

    controller = module.get<MercadopagoController>(MercadopagoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
