import { IsString } from 'class-validator';

export class AuthUserResponse {
  // @IsString()
  // id: string;

  @IsString()
  name: string;

  @IsString()
  phone: string;

  // @IsString()
  email: string;

  // @IsString()
  password: string;

  @IsString()
  token: string;
}
