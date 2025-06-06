import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    async register (@Res({passthrough: true}) res: Response, @Body() dto: AuthDto){
      return await this.authService.register(res, dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login (@Res({passthrough: true}) res: Response, @Body() dto: AuthDto){
      return await this.authService.login(res, dto);
    }

    @HttpCode(HttpStatus.OK)
    @Get('refresh')
    async refresh (@Req() req: Request, @Res({passthrough: true}) res: Response){
      return await this.authService.refresh(req, res);
    }

    @HttpCode(HttpStatus.OK)
    @Get('logout')
    async logout (@Res({passthrough: true}) res: Response){
      return await this.authService.logout(res);
    }

    @HttpCode(HttpStatus.OK)
    @Get('me')
    async getMe (@Req() req: Request){
      return await this.authService.getMe(req);
    }
}
