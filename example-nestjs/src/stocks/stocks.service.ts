import { Injectable, Inject } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';
import { FileService } from './file.service';
import { StockNotFoundException } from './exceptions/stock-not-found.exception';

@Injectable()
export class StocksService {
  constructor(
    @Inject(FileService) private fileService: FileService<Stock[]>,
  ) {}

  findAll(title?: string): Stock[] {
    const stocks = this.fileService.read();
    
    if (title) {
      return stocks.filter((stock) =>
        stock.title.toLowerCase().includes(title.toLowerCase()),
      );
    }
    
    return stocks;
  }

 //получение карточки по id
 findOne(id: number): Stock {
  const stocks = this.fileService.read();
  const stock = stocks.find((stock) => stock.id === id);
  
  if (!stock) {
    throw new StockNotFoundException(id);
  }
  
  return stock;
}

//создание новой карточки
create(createStockDto: CreateStockDto): Stock {
  const stocks = this.fileService.read();
  const newId = stocks.length > 0 ? Math.max(...stocks.map(s => s.id)) + 1 : 1;
  
  const stock: Stock = {
    id: newId,
    src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
    title: `Акция ${newId}`,
    text: `Такой акции вы еще не видели ${newId}`
  };
  
  this.fileService.add(stock);
  return stock;
}

//обновление карточки по id
update(id: number, updateStockDto: UpdateStockDto): Stock {
  const stocks = this.fileService.read();
  const stockIndex = stocks.findIndex((stock) => stock.id === id);
  
  if (stockIndex === -1) {
    throw new StockNotFoundException(id);
  }
  
  const updatedStock = { 
    ...stocks[stockIndex], 
    ...updateStockDto 
  };
  
  stocks[stockIndex] = updatedStock;
  this.fileService.write(stocks);
  
  return updatedStock;
}

//удаление карточки по id
remove(id: number): void {
  const stocks = this.fileService.read();
  const stockIndex = stocks.findIndex((stock) => stock.id === id);
  
  if (stockIndex === -1) {
    throw new StockNotFoundException(id);
  }
  
  const filteredStocks = stocks.filter((stock) => stock.id !== id);
  this.fileService.write(filteredStocks);
}
}