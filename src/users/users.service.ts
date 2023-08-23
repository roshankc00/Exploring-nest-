import { Injectable, BadRequestException , NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserSignupDto } from './dto/user-signup.dto';
import { hash, compare } from 'bcrypt';
import { UserSigninDto } from './dto/user-signin.dto';
import  {sign} from 'jsonwebtoken'
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}



  async signup(userSignupDto: UserSignupDto): Promise<UserEntity> {
    const userExists = await this.findUserByEmail(userSignupDto.email);
    if (userExists) {
      throw new BadRequestException('Email already exists');
    }
    userSignupDto.password = await hash(userSignupDto.password, 10);
    let user = this.usersRepository.create(userSignupDto);

    user = await this.usersRepository.save(user);
    delete user.password;
    return user;
  }



  async signin(userSigninDto: UserSigninDto):Promise<UserEntity> {
    const userExists = await this.usersRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email=email', { email: userSigninDto.email })
      .getOne();
    if (!userExists) {
      throw new BadRequestException('Email doesnt exists');
    }

    const isUserPasswordCorrect = await compare(
      userSigninDto.password,
      userExists.password,
    );
    console.log(isUserPasswordCorrect);

    if (!isUserPasswordCorrect) {
      throw new BadRequestException('Incorrect password');
    }
   


    
    return userExists
  }







  create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return 'This action adds a new user';
  }

  async findAll():Promise <UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findOne( id: number):Promise<UserEntity> {
    const user= await this.usersRepository.findOneBy({id});
    if(!user){
      throw new  NotFoundException("user not found")
    }
    return user
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }


  async acessToken(user:UserEntity):Promise<string>{
    return sign({
      id:user.id,email:user.email
    },process.env.SECRET,{
      expiresIn:'2d'
    })
  }
}
