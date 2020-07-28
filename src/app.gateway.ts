import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
 } from '@nestjs/websockets';

import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { GatewayService } from './app.service';
 
 @WebSocketGateway()
 export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(private readonly gatewayService: GatewayService){}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');
 
  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: object): void {
   this.server.emit('msgToClient', payload);

   this.gatewayService.getHello(payload, client.id)
  }
 
  afterInit(server: Server) {
   this.logger.log('Init');
  }
 
  handleDisconnect(client: Socket) {
   this.logger.log(`Client disconnected: ${client.id}`);
  }
 
  handleConnection(client: Socket, ...args: any[]) {
   this.logger.log(`Client connected: ${client.id}`);
  }
 }