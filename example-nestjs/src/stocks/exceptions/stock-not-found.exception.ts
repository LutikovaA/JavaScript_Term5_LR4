import { NotFoundException } from '@nestjs/common';

export class StockNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Акция с ID ${id} не найдена`);
  }
}