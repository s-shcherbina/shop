import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
// import { CreateUserDTO } from './dto';
import { User } from './models/user.model';
import { hash } from 'bcrypt';
import { CreateUserDTO } from './dto/create-user.dto';
// import { AppError } from 'src/commons/errors';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return hash(password, 5);
  }

  async findUserByPhone(phone: string): Promise<User> {
    return this.userRepository.findOne({
      where: { phone },
    });
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<CreateUserDTO> {
    // try {
    const existUser = await this.findUserByPhone(createUserDTO.phone);
    if (existUser)
      throw new BadRequestException(
        'Цей номер закріплений за іншим користувачем',
      );
    if (createUserDTO.password)
      createUserDTO.password = await this.hashPassword(createUserDTO.password);
    const user = await this.userRepository.create({
      name: createUserDTO.name,
      phone: createUserDTO.phone,
      email: createUserDTO.email,
      password: createUserDTO.password,
    });
    return user;
    // } catch (err) {
    //   throw new Error(err);
    // }
  }
}
