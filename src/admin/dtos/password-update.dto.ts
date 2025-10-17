import { IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  old_password: string;

  @IsString()
  new_password: string;

  @IsString()
  password_conf: string;
}
