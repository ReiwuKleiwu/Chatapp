import { Body, Controller, Get, Ip, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserDto } from 'src/user/dto/loginUser.dto';
import { RegisterUserDto } from 'src/user/dto/registerUser.dto';
import { User } from 'src/user/schemas/user.schema';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-user.decorator';

@Controller('api/auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {};

    @Post('/register')
    async signUp(@Body() registerUserDto: RegisterUserDto, @Ip() IP: string): Promise<void> {
        return this.authService.signUp(registerUserDto, IP);
    }

    @Post('/login')
    async signIn(@Body() loginUserDto: LoginUserDto, @Ip() IP: string): Promise<{ accessToken: string }> {
        return this.authService.signIn(loginUserDto, IP);
    }

    @Get('/user')
    @UseGuards(AuthGuard())
    async getUser(@GetUser() user: User): Promise<{user: {
        id: string,
        username: string,
        email: string,
        room_id: string,
        avatar: string,
        is_registered: Boolean
    }}> {
        return this.authService.getUser(user);
    }

}
