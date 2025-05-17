import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

 export class AvatarDto {
    @IsNotEmpty({message: "Ім'я користувача не може лишатися пустим"})
    @IsString({message: "Це поле може бути лише рядком"})
    @MinLength(7,{message: "Мінімальна довжина 7"})
    @MaxLength(128,{message: "Максимальна довжина 128"})
    avatar_url: string
 }