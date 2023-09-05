import { Controller, Get, Post, Body, Patch, 
  Param, Delete, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorators';
import { User } from '../users/entities/users.entity';
import { GetReqHeader } from './decorators/req-header.decorators';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected/role-protected.decorator';
import { ValidRoles } from './interfaces';
import { Auth } from './decorators/auth.decorators';




@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto)

  }
  @Get('check-status')
  @Auth()
checkAuthStatus(
  @GetUser() user:User
){
   return this.authService.checkAuthStatus(user)

}

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @Req() request: Express.Request,
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @GetReqHeader() rawHeaders: string[],
  ) {

    return {
      ok: true,
      message: 'hola mundo',
      user,
      userEmail,
      rawHeaders
    }

  }

  @Get('private2')
  @RoleProtected(ValidRoles.superUser)

  @UseGuards(AuthGuard(),UserRoleGuard)
  privateRouter2(
    @GetUser() user : User
  ){
    return{
      ok:true,
      user
    }

  }

  @Get('private3')
  @Auth()
  privateRouter3(
    @GetUser() user : User,
    
  ){
    return{
      ok:true,
      user
    }

  }


}
