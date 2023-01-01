import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { hash } from 'bcrypt';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

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

  async publicUser(phone: string): Promise<User> {
    return this.userRepository.findOne({
      where: { phone },
      attributes: { exclude: ['password'] },
    });
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<CreateUserDTO> {
    // try {
    if (createUserDTO.password) {
      createUserDTO.password = await this.hashPassword(createUserDTO.password);
    }
    const user = await this.userRepository.create({
      name: createUserDTO.name,
      phone: createUserDTO.phone,
      // locality: createUserDTO.locality,
      // adress: createUserDTO.address,
      email: createUserDTO.email,
      password: createUserDTO.password,
    });
    return user;
    // } catch (err) {
    //   throw new Error(err);
    // }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDTO): Promise<User> {
    const checkUser = await this.userRepository.findOne({
      where: { id },
    });
    const checkUserByPhone = await this.findUserByPhone(checkUser.phone);
    if (checkUserByPhone)
      throw new BadRequestException(
        'Цей номер закріплений за іншим користувачем',
      );
    await this.userRepository.update(updateUserDto, {
      where: { id },
    });
    const user = await this.userRepository.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
    return user;
  }

  async deleteUser(phone: string): Promise<boolean> {
    await this.userRepository.destroy({ where: { phone } });
    return true;
  }
}
