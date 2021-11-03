import { Model } from 'mongoose';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/registerUser.dto';
import { avatar_element_colors } from './avatars/avatar_element_colors';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {};

    async registerCreate(registerUserDto: RegisterUserDto, IP: string): Promise<void> {

        const { username, password, email, avatar } = registerUserDto;

        //Hash Password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const createdUser = new this.userModel({ 
            username,
            password: hashedPassword,
            email,
            avatar,
            is_registered: true,
            registered_at: Date.now(),
            ip_adress: IP,
            element_color: avatar_element_colors.get(avatar)
        });

        try {
            await createdUser.save();   
        } catch (error) {
            if(error.code === 11000) {
                throw new ConflictException('Username or email already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async anonymousLoginCreate(options: { username: string, avatar: string }, IP: string): Promise<void> {
        const { username, avatar } = options;

        const createdUser = new this.userModel({ 
            username,
            avatar,
            is_registered: false,
            ip_adress: IP,
            element_color: avatar_element_colors.get(avatar)
        });

        try {
            await createdUser.save();   
        } catch (error) {
            if(error.code === 11000) {
                console.log(error);
                throw new ConflictException('Username already exists');
            } else {
                console.log(error);
                throw new InternalServerErrorException();
            }
        }

    }

    //Finds all Users
    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    //Finds one specific user
    async findOne(query: object, select: object = {}): Promise<User> {
        return this.userModel.findOne(query, select).exec();
    }

    //Updates one specific user using a query, without loading the document into memory
    async updateOne(query: object, update: object): Promise<object> {
        return this.userModel.updateOne(query, update).exec();
    }

    //Updates the updated_at property of one specific user to latest date
    async setNewUpdatedAt(query: object): Promise<object> {
        return this.userModel.updateOne(query, { updated_at: Date.now() }).exec();
    }

    //Updates the room_id property of one specific user to new room id
    async setRoom(query: object, room_id: string): Promise<object> {
        return this.userModel.updateOne(query, { room_id: room_id, logged_at: Date.now() }).exec();
    }

    //Returns true in case a user is inside of a room, returns false otherwise
    async isUserInRoom(query: object): Promise<Boolean> {
        const user = await this.findOne(query);
        if(user['room_id']) 
            return true;

        return false;   
    }

}
