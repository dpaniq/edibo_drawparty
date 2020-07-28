import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService, GatewayService } from './app.service';
import { AppGateway } from './app.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, GatewayService, AppGateway],
})
export class AppModule {}
