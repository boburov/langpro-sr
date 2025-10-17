import { IsString } from 'class-validator';

export class CreatePlaylistDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}
