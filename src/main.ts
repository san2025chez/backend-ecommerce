import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 const configService = app.get(ConfigService)

 console.log(configService.get('PORT'));
 
   app.setGlobalPrefix('api')
   app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    })
   );
   app.enableCors();
  await app.listen(configService.get('PORT'));
}
bootstrap();
