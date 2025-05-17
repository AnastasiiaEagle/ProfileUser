import { Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

@Controller('avatar')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  @Post('file')
  @UseInterceptors(
    FileInterceptor('avatar', {
      dest: "./uploads",
    })
  )
  async create(@Req() req: Request, @UploadedFile() file){
    return await this.avatarService.create(req, `/uploads/${file.filename}`)
  }
}
