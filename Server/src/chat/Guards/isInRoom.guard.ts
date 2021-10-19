import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { Observable } from "rxjs";


@Injectable()
export class IsInRoom implements CanActivate {

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {

       if(context['args'][0].handshake.user.room_id !== '') {
            return true;
       }

       throw new WsException({ emitError: 'You are not inside of a room.'});

    }

 
}