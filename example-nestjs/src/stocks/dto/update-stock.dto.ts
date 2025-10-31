import { PartialType } from '@nestjs/mapped-types';
import { CreateStockDto } from './create-stock.dto';
import { IsOptional, IsUrl, MinLength, MaxLength } from 'class-validator';

export class UpdateStockDto extends PartialType(CreateStockDto) {
    @IsOptional()
    @IsUrl({}, { message: 'Ссылка на изображение должна быть дествительной' })
    src?: string;

    @IsOptional()
    @MinLength(3, { message: 'Название должно содержать минимум 3 символа' })
    @MaxLength(50, { message: 'Максимальное количество символов в названии: 50' })
    title?: string;

    @IsOptional()
    @MinLength(10, { message: 'Текст должен содержать минимум 10 символов' })
    @MaxLength(200, { message: 'Максимальное количество символов в тексте: 200' })
    text?: string;
}
