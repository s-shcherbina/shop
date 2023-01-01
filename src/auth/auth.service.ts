import { BadRequestException, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { TokenService } from 'src/token/token.service';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginUserDTO } from './dto/login-user.dto';
import { AuthUserResponse } from './response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUser(createUserDTO: CreateUserDTO): Promise<AuthUserResponse> {
    const existUser = await this.userService.findUserByPhone(
      createUserDTO.phone,
    );
    if (existUser)
      throw new BadRequestException(
        'Цей номер закріплений за іншим користувачем',
      );

    // return this.userService.createUser(createUserDTO);
    const newUser = await this.userService.createUser(createUserDTO);
    const user = await this.userService.publicUser(newUser.phone);
    const token = await this.tokenService.generateJwtToken({
      id: user.id,
      name: user.name,
      phone: user.phone,
    });

    return { ...user, token };
  }

  async loginUser(loginUserDto: LoginUserDTO): Promise<AuthUserResponse> {
    const existUser = await this.userService.findUserByPhone(
      loginUserDto.phone,
    );
    if (!existUser)
      throw new BadRequestException(
        'З цього номера телефону не було замовлень!',
      );

    // if (existUser.password) {
    //   const validatePassword = await compare(
    //     loginUserDto.password,
    //     existUser.password,
    //   );
    //   if (!validatePassword)
    //     throw new BadRequestException('Невірний телефон або пароль!');
    // }

    const token = await this.tokenService.generateJwtToken({
      id: existUser.id,
      name: existUser.name,
      phone: existUser.phone,
    });

    const user = await this.userService.publicUser(loginUserDto.phone);

    return { ...user, token };
  }
}
