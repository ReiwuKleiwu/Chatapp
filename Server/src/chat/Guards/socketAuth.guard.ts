import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { WsException } from "@nestjs/websockets";
import { Observable } from "rxjs";
import { jwtConstants } from "src/constants/jwt.constants";
import { User } from "src/user/schemas/user.schema";
import { UserService } from "src/user/user.service";

@Injectable()
export class SocketAuthGuard implements CanActivate {

    constructor(private userService: UserService, private jwtService: JwtService) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {

        if(!context['args'][0].handshake.headers.authorization)
            throw new WsException('Missing token.');
        

        const token = context['args'][0].handshake.headers.authorization.split(' ')[1];

        try {
            const payload = this.jwtService.verify(token, { secret: jwtConstants.secret});

            return new Promise(async (resolve, reject) => {
                const { username } = payload; 
                const user: User = await this.userService.findOne({ username }, { password: 0 });

                if(!user) {
                    reject(false);
                }
        
                context['args'][0].handshake.user = user;
                resolve(true);

            });

        } catch (error) {
            throw new WsException('Invalid payload.');
        }
    }

 
}