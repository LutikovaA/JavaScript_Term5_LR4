import { IsString, IsUrl, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateStockDto {
  @IsUrl({}, { message: 'Ссылка на изображение должна быть дествительной' })
  @IsNotEmpty({ message: 'Ссылка на изображение обязательна' })
  src: string;

  @IsString({ message: 'Название должно быть строкой' })
  @IsNotEmpty({ message: 'Название обязательно' })
  @MinLength(3, { message: 'Название должно содержать минимум 3 символа' })
  @MaxLength(50, { message: 'Максимальное количество символов в названии: 50' })
  title: string;

  @IsString({ message: 'Текст должен быть строкой' })
  @IsNotEmpty({ message: 'Текст обязателен' })
  @MinLength(10, { message: 'Текст должен содержать минимум 10 символов' })
  @MaxLength(200, { message: 'Максимальное количество символов в тексте: 200' })
  text: string;
}