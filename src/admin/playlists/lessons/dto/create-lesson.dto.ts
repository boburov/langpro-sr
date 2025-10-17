import { IsString } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  video_url: string;
}
