import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class AuthDto {
    @IsEmail({},{message: "Некоректний емейл"})
    @IsNotEmpty({message: "Поле не може бути пустим"})
    @IsString({message: "Поле має бути рядком"})
    email: string;

    @IsNotEmpty({message: "Поле на має бути пустим"})
    @IsString({message: "Поле має бути рядком"})
    @MinLength(5, {message: "Пароль має бути мінімум з 5 символів"})
    @MaxLength(128, {message: "Пароль має бути максимум з 128 символів"})
    password: string
}