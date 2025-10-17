import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchUserParamsDto {
  @IsString()
  name: string = '';

  @IsString()
  surname: string = '';

  @IsString()
  email: string = '';

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit: number = 10;
}
