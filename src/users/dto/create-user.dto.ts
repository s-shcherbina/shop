import { IsEmail, IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  // @IsString()
  @IsNotEmpty()
  @IsMobilePhone()
  phone: string;

  // @IsString()
  // @IsEmail()
  email: string;

  // @IsString()
  password: string;
}
