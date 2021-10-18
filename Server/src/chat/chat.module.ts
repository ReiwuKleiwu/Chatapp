import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/jwt.constants';
import { RoomModule } from 'src/room/room.module';

@Module({
  imports: [UserModule, RoomModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: {
      expiresIn: 3600
    }
  })], 
  providers: [ChatService, ChatGateway]
})
export class ChatModule {}
