import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
// import { Request } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUser(@Body() updateUserDto: UpdateUserDTO, @Req() request) {
    const user = request.user;
    return this.userService.updateUser(user.id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUser(@Req() request): Promise<boolean> {
    const user = request.user;
    return this.userService.deleteUser(user.phone);
  }
}
