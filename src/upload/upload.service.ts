import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Body, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NameSanitizerService } from 'src/global/name_sanitizer/name_sanitizer.service';
import sharp from 'sharp';
import { randomUUID } from 'crypto';

@Injectable()
export class UploadService {
  private s3: S3Client;
  private bucket_name: string;

  constructor(
    private configService: ConfigService,
    private readonly sanitizer: NameSanitizerService,
  ) {
    this.s3 = new S3Client({
      region: this.configService.get<string>('AWS_REGION', ''),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID', ''),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
          '',
        ),
      },
    });
    this.bucket_name = this.configService.get<string>('AWS_BUCKET_NAME', '');
  }

  async image(
    file: Express.Multer.File,
    params: { w: number; h: number; q: number },
  ) {
    const folder = 'thumbnails';
    console.log(file);
    const filename = this.sanitizer.sanitize(file.originalname);
    const key = `${folder}/${randomUUID()}-${params.h}px-${filename}`;

    let optimizedBuffer = await sharp(file.buffer)
      .resize({ width: params.w, height: params.h })
      .toFormat('webp', { quality: params.q })
      .toBuffer();

    const command = new PutObjectCommand({
      Key: key,
      Bucket: this.bucket_name,
      Body: optimizedBuffer,
      ContentType: 'image/webp',
    });

    await this.s3.send(command);

    return `https://${this.bucket_name}.s3.amazonaws.com/${command.input.Key}`;
  }

  async pfp(file: Express.Multer.File) {
    return this.image(file, { w: 300, h: 300, q: 80 });
  }
}
