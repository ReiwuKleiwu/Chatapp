import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { Observable } from "rxjs";


@Injectable()
export class AlreadyInRoom implements CanActivate {

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {

       if(context['args'][0].handshake.user.room_id !== '') {
            throw new WsException({ emitError: 'You are already inside of another room.'});
       }

       return true;

    }

 
}