import { Controller, Get, Post, Body, Patch, Param, Delete,ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserSigninDto } from './dto/user-signin.dto';
import { UserEntity } from './entities/user.entity';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async signupUser(@Body() body:UserSignupDto):Promise<UserSignupDto>{
   return await  this.usersService.signup(body);  

  }

  @Post('/signin')
  async signin(@Body() userSigninDto:UserSigninDto):Promise<{
    sucess:boolean,
    token:string,
    user:UserEntity

  }>{
    
    const user=await this.usersService.signin(userSigninDto)   
    const token=await this.usersService.acessToken(user);  
    
    return {
      sucess:true,
      token,
      user
    }

  




    
  }




  @Get()
  async findAll():Promise<UserEntity[]> {
    return await this.usersService.findAll()
  }

  @Get(':id')
 async  findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  
}
