import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { WsException } from "@nestjs/websockets";
import { Observable } from "rxjs";
import { jwtConstants } from "src/constants/jwt.constants";
import { User } from "src/user/schemas/user.schema";
import { UserService } from "src/user/user.service";

@Injectable()
export class AlreadyInRoom implements CanActivate {

    constructor(private userService: UserService, private jwtService: JwtService) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {

       if(context['args'][0].handshake.user.room_id !== '') {
            throw new WsException({ emitError: 'You are already inside of another room.'});
       }

       return true;

    }

 
}