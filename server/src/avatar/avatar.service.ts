import { ArgumentMetadata, Injectable, PipeTransform, UnauthorizedException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { AvatarDto } from './dto/avatar.dto';
import { JwtPayload } from 'src/auth/interfaces/jwt.interface';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AvatarService implements PipeTransform{
    constructor(private readonly jwtService: JwtService,
        private readonly prismaService: PrismaService,
    ){}

    transform(value: any, metadata: ArgumentMetadata) {
    const oneKb = 1000
    return value.size < oneKb
    }

    getStorage() {
        return diskStorage({
            destination: './uploads'
        })
    }

    async create(req: Request, path: string){
        const refreshToken = req.cookies['refreshToken'];

        if (!refreshToken || refreshToken === 'refreshToken') {
            throw new UnauthorizedException('Недійсний refresh-токен');
        }
        const payload: JwtPayload = await this.jwtService.verifyAsync(refreshToken);
        const userId = payload.id;

        const avatar = await this.prismaService.avatarUser.create({
            data: {
                avatar_url: path
            }
        })
        await this.prismaService.users.update({
            where: {
                id: userId
            },
            data: {
                avatarUserId: avatar.id
            }
        })
        
        console.log(path)
        return "Збереження пройшло успішно"
    }
}
