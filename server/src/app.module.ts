import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AvatarModule } from './avatar/avatar.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({ // доступ до папки upload 
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',                   
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),PrismaModule, AuthModule, AvatarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
