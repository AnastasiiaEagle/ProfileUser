import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AvatarModule } from './avatar/avatar.module';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
    }),PrismaModule, AuthModule, AvatarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
