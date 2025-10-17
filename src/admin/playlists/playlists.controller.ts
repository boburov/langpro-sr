import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { AdminAccessGuard } from 'src/guards/admin-access/admin-access.guard';
import { multerOptions } from 'src/upload/multer.options';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  // @UseGuards(AdminAccessGuard)
  @UseInterceptors(FileInterceptor('thumbnail', multerOptions))
  @Post('new')
  create(
    @Body() data: CreatePlaylistDto,
    @UploadedFile() thumbnail: Express.Multer.File,
  ) {
    return this.playlistsService.create(data, thumbnail);
  }

  @Get()
  findAll() {
    return this.playlistsService.findAll();
  }

  @Get(':unique_name')
  findOne(@Param('unique_name') unique_name: string) {
    return this.playlistsService.findOne(unique_name);
  }

  @UseGuards(AdminAccessGuard)
  @UseInterceptors(FileInterceptor('thumbnail', multerOptions))
  @Patch(':unique_name')
  update(
    @Param('unique_name') unique_name: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
    @UploadedFile() thumbnail: Express.Multer.File,
  ) {
    return this.playlistsService.update(
      unique_name,
      updatePlaylistDto,
      thumbnail,
    );
  }

  @UseGuards(AdminAccessGuard)
  @Delete(':unique_name')
  remove(@Param('unique_name') unique_name: string) {
    return this.playlistsService.remove(unique_name);
  }

  @UseGuards(AdminAccessGuard)
  @Post(':unique_name/add_new_user/:user_id')
  addNewUser(
    @Param('unique_name') unique_name: string,
    @Param('user_id') user_id: string,
  ) {
    return this.playlistsService.addNewUser(unique_name, user_id);
  }

  @UseGuards(AdminAccessGuard)
  @Delete(':unique_name/remove_user/:user_id')
  removeUser(
    @Param('unique_name') unique_name: string,
    @Param('user_id') user_id: string,
  ) {
    return this.playlistsService.removeUser(unique_name, user_id);
  }
}
