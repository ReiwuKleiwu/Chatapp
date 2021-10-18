import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { CreateRoomDto } from 'src/room/dto/createRoom.dto';
import { RoomService } from 'src/room/room.service';
import { Room } from 'src/room/schemas/room.schema';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ChatService {

    constructor(private roomService: RoomService, private userService: UserService){};

    async getRooms(): Promise<Object[]> {
        return this.roomService.getAllRooms();
    }

    async createRoom(client: any, user: User, payload: CreateRoomDto, server: any): Promise<void> {
        const created_room = await this.roomService.createRoom(payload, user);
        server.to(client.id).emit('rooms/joinSuccess', created_room.room_id);
    }

    async joinRoom(client: any, user: User, room_id: string, server: any): Promise<void> {

        try {

            const room = await this.roomService.getRoom(room_id);

            if(!room)
                throw new WsException('The room you tried to join doesn\'t exist');

            if(this.roomService.isFull(room)) { //If room is full and user is not an admin or mod
                throw new WsException('The room you tried to join is already full.');
            }

            let is_already_in_room: User;
            let is_banned: string;

            if(room.users)
                is_already_in_room = room.users.find((_user: User) => _user['_id'].equals(user['_id']));
        
            if(room.banned_users) 
                is_banned = room.banned_users.find((IP: string) => IP === user.ip_adress);

            if(is_banned) {
                server.to(client.id).emit('rooms/joinErorr');
                throw new WsException('You were banned from the room you tried to join.');
            }

            if(!is_already_in_room) {
                //Update user
                await this.userService.setNewUpdatedAt({ _id: user['_id'] });

                //Send join message
            

                //Add user to room
                await this.roomService.addParticipant(room_id, user['_id']);

                //Set room
                await this.userService.setRoom({ _id: user['_id']}, room_id);

            }

     
            server.to(client.id).emit('rooms/joinSuccess', room_id);

    }
    catch(err) {
        console.log(err);
    }

    }

}
