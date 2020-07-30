const fs = require('fs');
const path = require('path');
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

@Injectable()
export class GatewayService {
  saveToJSON(data: object, id: string): void {
    fs.readFile('./upload/paints.json', { encoding: 'utf8' }, (err, prevData) => {
      if(err) {
        console.error('Error read file', err);
      } else {
        const json = !prevData.length ? {images: {}} : JSON.parse(prevData)

        if (!json.images[id]) json.images[id] = []
        json.images[id].push(data)

        try {
          fs.writeFileSync('./upload/paints.json', JSON.stringify(json));
          console.log("File has been saved.");
        } catch (error) {
            console.error('Error write file:', err);
        }
      }
    })
  }

  deleteFromJson(id) {
    fs.readFile('./upload/paints.json', { encoding: 'utf8' }, (err, prevData) => {
      if(err) {
        console.error('Error read file', err);
      } else {
        const json = JSON.parse(prevData)
        delete json.images[id]

        try {
          fs.writeFileSync('./upload/paints.json', JSON.stringify(json));
          console.log(`Guy with that id ${id} gone.`)
          console.log("File has been saved.");
        } catch (error) {
          console.error('Error write file:', err);
        }
      }
    })
  }
}
