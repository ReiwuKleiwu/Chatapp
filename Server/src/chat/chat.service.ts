import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { CreateRoomDto } from 'src/room/dto/createRoom.dto';
import { RoomService } from 'src/room/room.service';
import { Message, Room } from 'src/room/schemas/room.schema';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import * as mongoose from 'mongoose';

@Injectable()
export class ChatService {

    constructor(private roomService: RoomService, private userService: UserService){};

    async getRooms(): Promise<Object[]> {
        return await this.roomService.getAllRooms();
    }

    async getRoomData(room_id: string, user: User): Promise<Room> {
        const room =  await this.roomService.getRoomData(room_id);

        room.messages = room.messages.filter((message) => {
            if(!message.to) {
                return true;
            }

            if(user['_id'].equals(message.to['_id'])) {
                return true;
            }

            if(message.author['_id'].equals(user['_id'])) {
                return true;
            }
        });

        return room; 
    }

    async createRoom(client: any, user: User, payload: CreateRoomDto, server: any): Promise<void> {
        const created_room = await this.roomService.createRoom(payload, user);
        await this.roomService.addParticipant(created_room.room_id, user['_id']);
        server.to(client.id).emit('rooms/joinSuccess', created_room.room_id);
        client.join(created_room.room_id);
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
                await this.userService.setRoom({ _id: user['_id'] }, room_id);

            }

     
            server.to(client.id).emit('rooms/joinSuccess', room_id);
            client.join(room_id);

    }
    catch(err) {
        console.log(err);
    }

    }

    async leaveRoom(client: any, user: User, server: any): Promise<void> {
        
            let room = await this.roomService.getRoom(user.room_id);

            if(!room) // This should never be true due to the 'IsInRoom' guard 
                throw new WsException('The room you tried to leave doesn\'t exist');

        try {        
            await this.roomService.removeParticipant(room.room_id, user['_id']);

            room = await this.roomService.getRoom(user.room_id);

            const should_be_deleted = this.roomService.shouldBeDeleted(room);
            
            if(should_be_deleted) {
                await this.roomService.deleteRoom(room); 
            }

            const is_host = this.roomService.isHost(room, user['_id']);

            if(is_host && !should_be_deleted) {
                if(room.users.length > 0) {
                    await this.roomService.assignNewHost(room);
                }
            }

            await this.userService.setRoom({ _id: user['_id'] }, '');

            server.to(client.id).emit('rooms/leaveSuccess');
            client.leave(user.room_id);

        } catch (err) {
            console.log(err);
        }
    }

    async sendMessage(client: any, user: User, message: {
        content: string,
        to: string
    } , clients: any, server: any): Promise<void> {
        
        const room = await this.roomService.getRoom(user.room_id);

        if(!room) // This should never be true due to the 'IsInRoom' guard 
            throw new WsException('You\'re not inside of a room.');

                
        const sender = {
            _id: user['_id'],
            username: user.username,
            avatar: user.avatar,
            is_registered: user.is_registered
        }
        
        const newMessage = {
            author: user['_id'],
            to: null,
            content: message.content,
            type: 'message',
        };    
        

        if(message.to) {

            if(user['_id'].equals(message.to))
                throw new WsException('Bro...find some friends, honestly..');

            try {

                const dmTarget = await this.userService.findOne({ _id: new mongoose.Types.ObjectId(message.to)});
                
                if(!dmTarget) //Should probably put this logic into a guard
                    throw new WsException('The user you tried to message does not exist.');

                newMessage.to = new mongoose.Types.ObjectId(message.to);
                newMessage.type = 'dm';

                await this.roomService.addMessage(user.room_id, newMessage);

                server.to(clients[dmTarget['_id']].id).emit('rooms/message', {
                    author: sender, 
                    to: newMessage.to,
                    content: newMessage.content,
                    type: newMessage.type,
                });

                console.log(client.id);

                return server.to(client.id).emit('rooms/message', {
                    author: sender, 
                    to: newMessage.to,
                    content: newMessage.content,
                    type: newMessage.type,
                });

            } catch (error) {
                console.log(error);
                throw new WsException('The user you tried to message does not exist.');
            }

        }

        try {
            await this.roomService.addMessage(user.room_id, newMessage);

            return server.to(user.room_id).emit('rooms/message', {
                author: sender, 
                to: '',
                content: newMessage.content,
                type: newMessage.type,
            });


        } catch (error) {
            console.log(error);
        }

        
    }

}
