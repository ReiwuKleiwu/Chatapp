import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema, Message, Room, RoomSchema } from './schemas/room.schema';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Room.name, schema: RoomSchema}, {name: Message.name, schema: MessageSchema}]),
    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: [RoomService],
  exports: [RoomService]
})
export class RoomModule {}
 
