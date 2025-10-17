import { HttpException, Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GenerateUniquenameService } from 'src/global/generate_uniquename/generate_uniquename.service';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class PlaylistsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly unique_name: GenerateUniquenameService,
    private readonly upload: UploadService,
  ) {}

  async create(data: CreatePlaylistDto, thumbnail: Express.Multer.File) {
    const unique_name = await this.unique_name.generate(data.title);
    const UploadedThumbnail = await this.upload.image(thumbnail, {
      q: 80,
      w: 1280,
      h: 720,
    });
    const newPlaylist = await this.prisma.playlist.create({
      data: {
        ...data,
        thumbnail: UploadedThumbnail,
        unique_name: unique_name,
      },
    });
    return newPlaylist;
  }

  async findAll() {
    return await this.prisma.playlist.findMany({
      include: {
        _count: {
          select: {
            lessons: true,
          },
        },
      },
    });
  }

  async findOne(unique_name: string) {
    const the_playlist = await this.prisma.playlist.findUnique({
      where: { unique_name: unique_name },
      include: {
        lessons: true,
      },
    });
    if (!the_playlist) {
      throw new HttpException('playlist not found', 404);
    }
    return the_playlist;
  }

  async update(
    unique_name: string,
    updatePlaylistDto: UpdatePlaylistDto,
    thumbnail: Express.Multer.File,
  ) {
    let up_th: string | null = null;
    if (thumbnail) {
      up_th = await this.upload.image(thumbnail, {
        q: 80,
        w: 1280,
        h: 720,
      });
    }

    const updating = await this.prisma.playlist.update({
      where: { unique_name: unique_name },
      data: { ...updatePlaylistDto, ...(up_th && { thumbnail: up_th }) },
    });

    return updating;
  }

  async remove(unique_name: string) {
    await this.prisma.playlist.delete({ where: { unique_name: unique_name } });
    return { deleted: true };
  }

  async addNewUser(unique_name: string, user_id: string) {
    const existing = await this.prisma.courses.findFirst({
      where: { playlist: { unique_name: unique_name }, userId: user_id },
    });
    if (existing)
      throw new HttpException(
        'Ushbu foidalanuvchi, bu darslarda allaqachon bor',
        404,
      );
    const newCourse = await this.prisma.courses.create({
      data: {
        playlist: {
          connect: {
            unique_name: unique_name,
          },
        },
        User: {
          connect: {
            id: user_id,
          },
        },
      },
      include: {
        playlist: true,
      },
    });

    return newCourse;
  }

  async removeUser(unique_name: string, user_id: string) {
    await this.prisma.courses.deleteMany({
      where: { playlist: { unique_name: unique_name }, userId: user_id },
    });
    return { deleted: true };
  }
}
