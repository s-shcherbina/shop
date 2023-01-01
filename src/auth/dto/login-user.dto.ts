import { IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDTO {
  @IsString()
  @IsNotEmpty()
  @IsMobilePhone()
  phone: string;

  // @IsString()
  // @IsEmail()
  email: string;

  // @IsString()
  password: string;
}
