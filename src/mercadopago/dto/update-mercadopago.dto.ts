import { PartialType } from '@nestjs/mapped-types';
import { CreateMercadopagoDto } from './create-mercadopago.dto';

export class UpdateMercadopagoDto extends PartialType(CreateMercadopagoDto) {}
