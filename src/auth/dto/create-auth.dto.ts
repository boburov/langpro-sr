import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty({ message: 'Ism kiritilishi shart' })
  @MinLength(2, { message: 'Ism juda qisqa (kamida 2 ta belgi)' })
  @MaxLength(50, { message: 'Ism juda uzun (ko‘pi bilan 50 ta belgi)' })
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(50, { message: 'Familiya juda uzun (ko‘pi bilan 50 ta belgi)' })
  surname?: string;

  @IsEmail({}, { message: 'Email noto‘g‘ri kiritildi' })
  @IsNotEmpty({ message: 'Email kiritilishi shart' })
  email: string;
}
