import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { RegisterUserDto } from 'src/user/dto/registerUser.dto';
import { LoginUserDto } from 'src/user/dto/loginUser.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
        ) {};

    async signUp(registerUserDto: RegisterUserDto, IP: string): Promise<void> {
        return this.userService.registerCreate(registerUserDto, IP);
    }

    async signIn(loginUserDto: LoginUserDto, IP: string): Promise<{ accessToken: string }> {
        const { username, password , avatar} = loginUserDto;

        const user = await this.userService.findOne({ username });

        if(password !== '') { //Normal Login

        if(user && (await bcrypt.compare(password, user.password))) {
            //Set new user IP
            await this.userService.updateOne({ username }, { ip_adress: IP });

            const payload: JwtPayload = { username };
            const accessToken: string = await this.jwtService.sign(payload);
            return { accessToken };
        }
        else {
            throw new UnauthorizedException('Please check your login credentials');
        }
    } else { //Anonymous Login
        if(user) 
            throw new ConflictException('Username is already taken.');
        
        
        await this.userService.anonymousLoginCreate({ username, avatar }, IP);

        const payload: JwtPayload = { username };
            const accessToken: string = await this.jwtService.sign(payload);
            return { accessToken };

    }

    }
    

    async getUser(user: User): Promise<{user: {
        id: string,
        username: string,
        email: string,
        room_id: string,
        avatar: string,
        is_registered: Boolean
    }}> {

        return {
            user: {
                id: user['_id'],
                username: user['username'],
                email: user['email'],
                room_id: user['room_id'],
                avatar: user['avatar'],
                is_registered: user['is_registered']
            }
        };
    }

}
