import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto/login-user.dto';
import { AuthUserResponse } from './response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDTO): Promise<CreateUserDTO> {
    return this.authService.registerUser(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDTO): Promise<AuthUserResponse> {
    return this.authService.loginUser(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('test')
  test() {
    return true;
  }
}
