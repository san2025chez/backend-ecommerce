import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../users/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.startegy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],

  imports:[
    ConfigModule,
  TypeOrmModule.forFeature([User]),
PassportModule.register({defaultStrategy:'jwt'}),

JwtModule.registerAsync({
  imports:[ConfigModule],
  inject :[ ConfigService],
  useFactory:(configService: ConfigService) =>{
    return {
      secret: configService.get('JWT_SECRET'),
      signOptions:{
        expiresIn:'2h'
      }
    }
    
  }
})

],
exports:[ TypeOrmModule, JwtStrategy, PassportModule, JwtModule]
})
export class AuthModule {}
