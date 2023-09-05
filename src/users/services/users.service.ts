import { BadRequestException, Injectable,
     InternalServerErrorException, Logger, 
     NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import { stringify } from 'querystring';
import { CreateUserDto } from '../dto/create-user.dto';
import { UUID } from 'crypto';
import { updateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {

    private readonly logger = new Logger('UsersService')
    constructor(
        @InjectRepository(User) private  userRepo: Repository<User>
    ){}

    async findAll(){
      return await  this.userRepo.find();
    }

   async findOneUser(id: string){
    console.log("EL ID para buscar al usuario", id);
    
        const user= await this.userRepo.findBy({id})
        console.log("ENUENTR AUN USUARIO", user);
        
        return user;
    }

   async deleteUser(id: any){


    const user = await this.findOneUser(id)
        await this.userRepo.remove(user)
    }



    async updateUser(id: string, userDto: updateUserDto){
      const user= {id,...userDto}


      await this.userRepo.preload(user);
      if (!user) throw new NotFoundException(`user con ${id}  not found`);

      await this.userRepo.save(user);


    }

    async create(createProductDto: CreateUserDto){
        try {
            const usuario = this.userRepo.create(createProductDto);
            await  this.userRepo.save(usuario)
            return usuario;
            
        } catch (error) {
            this.handelDBExceptions(error)
        }

    }


    private handelDBExceptions(error : any){
        if (error.code === '23505') {
            throw new BadRequestException(error.detail);

            this.logger.error(error)

            throw new InternalServerErrorException('Unexpected error, check server logs');
            
        }
    }
}
