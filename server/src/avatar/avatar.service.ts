import { ArgumentMetadata, Injectable, PipeTransform, UnauthorizedException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { AvatarDto } from './dto/avatar.dto';
import { JwtPayload } from 'src/auth/interfaces/jwt.interface';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import * as path from 'path';
import * as fs from 'fs';

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

    inRefreshToken = async (req: Request): Promise<string> =>{ // Дістаємо з токену користувача
        const refreshToken = req.cookies['refreshToken'];

        if (!refreshToken || refreshToken === 'refreshToken') {
            throw new UnauthorizedException('Недійсний refresh-токен');
        }
        const payload: JwtPayload = await this.jwtService.verifyAsync(refreshToken);
        const userId = payload.id;

        return userId
    }

    deleteImg = (pathImg: string) =>{ //Видаляємо зображення
        const filePath = path.join(process.cwd(), 'uploads', pathImg)

        if (!fs.existsSync(filePath)) {
            console.warn('Файл не знайдено для видалення:', filePath)
            return
        }

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Помилка при видаленні файлу:', err)
            } else {
                console.log('Файл видалено')
            }
        })
    }

    async save(req: Request, path: string){ //шукаємо чи є вже в користувача зображення
        const userId: string = await this.inRefreshToken(req)

        const isAvatarUser = await this.prismaService.users.findUnique({
            where: {
                id: userId
            },
            select: {
                avatarUserId: true
            }
        })

        if(isAvatarUser?.avatarUserId !== null){ //Якщо є то видаляємо попередні зображення
            const nameImg = await this.prismaService.avatarUser.delete({
                where: {
                    id: isAvatarUser?.avatarUserId
                },
                select:{
                    avatar_url: true
                }
            })
            this.deleteImg(nameImg.avatar_url)
        }


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

    async show(){

    }
}
