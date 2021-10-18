import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { ChatModule } from './chat/chat.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), AuthModule, UserModule, RoomModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
