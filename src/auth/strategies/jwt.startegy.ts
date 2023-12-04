import { PassportStrategy } from "@nestjs/passport";
import { User } from "../../users/entities/users.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    configService: ConfigService
){


    super({
        secretOrKey: configService.get('JWT_SECRET'),
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
}


    async validate(payload: JwtPayload): Promise<User>{

        const {id}= payload;

        const user = await this.userRepository.findOneBy({id});

   if(!user)
   throw new UnauthorizedException('Token not valid')

   if(!user.isActive)
   throw new UnauthorizedException('User is inactive, talk with an admin');
   return user;
    }

}