import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { storage } from 'src/system/upload/multer';
import { returnObjects } from 'src/utils/funcs';

@Controller('files')
export class FileController {
  constructor(private configService: ConfigService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage }))
  uploadedFile(@UploadedFile() file: Express.Multer.File) {
    const protocol = this.configService.get<string>('PROTOCOL');
    const domain = this.configService.get<string>('DOMAIN');
    const port = this.configService.get<string>('PORT');

    const path = `${protocol}://${domain}:${port}/uploads/${file.filename}`;

    return returnObjects({ name: file.originalname, path });
  }
}
