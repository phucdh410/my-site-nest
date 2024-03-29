import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [FileController],
})
export class FileModule {}
