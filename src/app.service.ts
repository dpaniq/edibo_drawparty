// fs = require('writeFile');
// fs.writeFile('helloworld.txt', 'Hello World!', function (err) {
//   if (err) return console.log(err);
//   console.log('Hello World > helloworld.txt');
// });

// import { writeFile } from 'fs'
const fs = require('fs');
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

@Injectable()
export class GatewayService {
  getHello(data: object, id: string): void {
    console.log('DATA', data)
    fs.writeFile('./upload/paints.json', `cliendID: ${id}\n\n\n`, (err) => console.log(err))
    fs.appendFile('./upload/paints.json', JSON.stringify(data), (err) => console.log(err))
  }
}
