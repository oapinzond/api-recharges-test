import { IsAlphanumeric, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsAlphanumeric()
  @IsNotEmpty()
  username!: string;

  @IsNotEmpty()
  password!: string;
}
