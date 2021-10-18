import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { CreateRoomDto } from './dto/createRoom.dto';
import { IsAlreadyInRoomGuard } from './guards/isAlreadyInRoom.guard';
import { RoomService } from './room.service';
import { Room } from './schemas/room.schema';

@Controller('room')
@UseGuards(AuthGuard())
export class RoomController {

    constructor(private readonly roomService: RoomService) {};

    // @Post('/create_room')
    // @UseGuards(IsAlreadyInRoomGuard)
    // async createRoom(@Body() createRoomDto: CreateRoomDto, @GetUser() user: User): Promise<Room> {
    //     return this.roomService.createRoom(createRoomDto, user);
    // }

    // @Get('/:id')
    // @UseGuards(IsAlreadyInRoomGuard) 
    // async joinRoom(@GetUser() user: User, @Param('id') room_id: string): Promise<Room> {
    //     return this.roomService.showRoom(user, room_id);
    // }


}   
