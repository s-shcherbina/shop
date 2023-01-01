import { IsEmail, IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsMobilePhone()
  phone: string;

  email: string;
}
