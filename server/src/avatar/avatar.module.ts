import { Module } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { AvatarController } from './avatar.controller';
import { MulterModule } from '@nestjs/platform-express';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { getJwtConfig } from 'src/config/jwt.config';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads'
    }),
    JwtModule.registerAsync({
        imports: [ConfigModule, PrismaModule],
        useFactory: getJwtConfig,
        inject: [ConfigService],
      })
  ],
  controllers: [AvatarController],
  providers: [AvatarService],
})
export class AvatarModule {}
