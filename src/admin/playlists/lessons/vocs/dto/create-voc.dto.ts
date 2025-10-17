import { IsString } from 'class-validator';

export class CreateVocDto {
  @IsString()
  word: string;

  @IsString()
  translation: string;
}
