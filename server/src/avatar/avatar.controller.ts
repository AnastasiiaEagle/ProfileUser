import { Controller, Get, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('avatar')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  @Post('file')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const ext = extname(file.originalname); // .png, .jpg, і т.д.
          const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
          cb(null, fileName);
        },
      }),
    })
  )
  async save(@Req() req: Request, @UploadedFile() file: Express.Multer.File){
    return await this.avatarService.save(req, file.filename)
  }

  @Get('show')
  show(@Req() req: Request){
    return this.avatarService.show(req)
  }
}
