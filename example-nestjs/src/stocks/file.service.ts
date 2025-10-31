import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService<I> {
  private readonly filePath: string;

  constructor(filePath?: string) {
    if (filePath) {

      const baseDir = process.env.NODE_ENV === 'production' 
        ? path.resolve(process.cwd(), 'dist') 
        : path.resolve(process.cwd(), 'src');
      
      this.filePath = path.resolve(baseDir, filePath);
    } else {
      this.filePath = path.resolve(__dirname);
    }
  }


  public read<T extends I>(): T {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data) as T;
  }

  public add<T>(newData: T): void {
    const data = this.read();

    if (Array.isArray(data)) {
      data.push(newData);
    }

    this.write(data);
  }

  public write<T extends I>(data: T): void {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
  }
}