import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UUID } from 'crypto';
import { updateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post()
    create(@Body() createUserDto: CreateUserDto){
        console.log("create");
        
        return this.usersService.create(createUserDto)
    }


    @Get()
    getUser(){
        return this.usersService.findAll()
    }

    @Get('/:id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        console.log("ingreso por id", id);
        
     
      return this.usersService.findOneUser(id)
    }

    @Delete('/:id')
    delete(@Param('id', ParseUUIDPipe) id: string){
        return this.usersService.deleteUser(id as UUID)
    }

    @Patch(':id')
    remove(@Param('id') id: string , @Body() userDto: updateUserDto){
        return this.usersService.updateUser(id, userDto)
    }
}
