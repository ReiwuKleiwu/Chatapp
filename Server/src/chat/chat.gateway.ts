import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { SocketAuthGuard } from './Guards/socketAuth.guard';
import { GetSocketUser } from './decorators/get-socket-user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/jwt.constants';
import { UserService } from 'src/user/user.service';
import { ChatService } from './chat.service';
import { Room } from 'src/room/schemas/room.schema';
import { AlreadyInRoom } from './Guards/alreadyInRoom.guard';
import { CreateRoomDto } from 'src/room/dto/createRoom.dto';
import { IsInRoom } from './Guards/isInRoom.guard';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:8000', 
    credentials: true
  }
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

  private clients: any[];

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private chatService: ChatService
  ){
    this.clients = [];
  };

  @WebSocketServer()
  server: Server;

  async handleConnection(client: any, ...args: any[]) {
    if(!client.handshake.headers.authorization)
      throw new WsException('Missing token.');

    const token = client.handshake.headers.authorization.split(' ')[1];

    try {
        const payload = this.jwtService.verify(token, { secret: jwtConstants.secret});

        const { username } = payload; 

        const user: User = await this.userService.findOne({ username }, { _id: 1 });

        if(!user)
          client.disconnect();
        
        console.log('Socket connected!');
        this.clients[client.id] = client;
    } catch (error) {
        client.disconnect();
    }
  };

  async handleDisconnect(client: any) {
    try {
      delete this.clients[client.id];
    } catch (error) {
      console.log(error);
    }
  };

  async afterInit(client: any) {};

  @UseGuards(SocketAuthGuard)
  @SubscribeMessage('rooms/get')
  async getRooms(@ConnectedSocket() client: any, @GetSocketUser() user: User, payload: any): Promise<Object[]> {
    return this.chatService.getRooms();
  }

  @UseGuards(SocketAuthGuard, AlreadyInRoom)
  @SubscribeMessage('rooms/create')
  async createRoom(@ConnectedSocket() client: any, @GetSocketUser() user: User, @MessageBody() message: CreateRoomDto): Promise<void> {
    await this.chatService.createRoom(client, user, message, this.server);

    const rooms = await this.chatService.getRooms();
    this.server.emit('rooms/update', rooms);
  }

  @UseGuards(SocketAuthGuard, AlreadyInRoom)
  @SubscribeMessage('rooms/join')
  async joinRoom(@ConnectedSocket() client: any, @GetSocketUser() user: User, @MessageBody() room_id: string): Promise<void> {
    console.log('Joining room!');
    await this.chatService.joinRoom(client, user, room_id, this.server);

    const rooms = await this.chatService.getRooms();
    this.server.emit('rooms/update', rooms); 
  }

  @UseGuards(SocketAuthGuard, IsInRoom)
  @SubscribeMessage('rooms/leave')
  async leaveRoom(@ConnectedSocket() client: any, @GetSocketUser() user: User): Promise<void> {
    await this.chatService.leaveRoom(client, user, this.server);

    const rooms = await this.chatService.getRooms();
    this.server.emit('rooms/update', rooms); 
  }

}