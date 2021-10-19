import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { ConflictException, ConsoleLogger, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room, RoomDocument } from './schemas/room.schema';
import { CreateRoomDto } from './dto/createRoom.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RoomService { 

    constructor(
        @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
        private readonly userService: UserService
        ) {};

    /**
     * Generates a random ID with the length of len characters
     * @param {Number} len length of the to be genereated ID
     * @returns {string} randomly generated ID
     */
    static generateID(len = 4): string {

        let charpool = 'abcdefghijklmnopqrstuvwxyz' +
                         'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
                         '012345689';

        let id = '';

        for(let i = 0; i < len; i++) {
            id += charpool[Math.floor(Math.random() * charpool.length)];
        }

        return id;
    }

    /**
     * Adds a user's ID to a room's users array
     * @param {string} room_id id of the room that the user will be added to
     * @param {string} user_id id of the user that will be added to the room
     */
    async addParticipant(room_id: string, user_id: string): Promise<void> {
        await this.roomModel.updateOne({ room_id: room_id }, { $push: { users: user_id } }).exec();
    }

    /**
     * Removes a user's ID from a room's users array
     * @param {string} room_id 
     * @param {string} user_id 
     */
    async removeParticipant(room_id: string, user_id: string): Promise<void> {
        try {
            await this.roomModel.updateOne({ room_id: room_id }, { $pull: { users: user_id } }).exec();          
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Assigns a new user to a rooms host field
     * @param {Room} room 
     */
    async assignNewHost(room: Room): Promise<void> {
        
        try {
            let newHostID = await this.findNewHost(room);
            let newHost = await this.userService.findOne({ _id: newHostID });

            if(newHost) {
                await this.roomModel.updateOne({ room_id: room.room_id }, { host: newHost }).exec();
            }

        } catch (error) {
            console.log(error);
        }

    }

    /**
     * Finds a new host for a room by finding the user
     * that has be inside of the room for the longest time.
     * @param {Room} room 
     * @returns {string} user id of the new host
     */
    async findNewHost(room: Room): Promise<string> {
        let lowest = new Date(8640000000000000).getTime();
        let newHost: string;

        for(const user of room.users) {
            if(user.logged_at < lowest) {
                lowest = user.logged_at;
                newHost = user['_id'];
            }
        }

        return newHost;
    }

    /**
     * Tells whether or not the room's userlist length exceeds
     * the allowed room capacity
     * @param {Room} room room which will be used for the check
     * @returns {boolean} true if room is full, false otherwise
     */
    isFull(room: Room): Boolean {
        return room.users.length >= room.capacity; 
    }

    /**
     * Tells whether or not a room should be deleted, that is
     * the case when a room is not static and the there are 
     * no users inside.
     * @param {Room} room 
     * @returns {boolean} true if empty and not static, false otherwise
     */
    shouldBeDeleted(room: Room): Boolean {
        return room.users.length === 0 && !room.is_static;
    }

    /**
     * Tells whether or not a user is the host of a room
     * @param {Room} room 
     * @param {string} user_id 
     * @returns true if user_id is host of the room, false otherwise
     */
    isHost(room: Room, user_id: string): Boolean {
        return room.host['_id'].equals(user_id);
    }

    /**
     * Creates a room in the database
     * @param {CreateRoomDto} createRoomDto the given settings which will be used to create a room
     * @param {User} user the user who sent the request to create the room
     * @returns {Room} room the newly created room
     */
    async createRoom(createRoomDto: CreateRoomDto, user: User): Promise<Room> {
        
        const {
            name,
            description,
            language,
            capacity,
            password,
            is_adult,
            is_music,
            is_knock,
            is_registered_only,
            is_static,
            tags
        } = createRoomDto;

        let hashedPassword = '';
        if(password !== '') {
            const salt = await bcrypt.genSalt();
            hashedPassword = await bcrypt.hash(password, salt);
        }

        let generatedRoomId = RoomService.generateID(4);

        const createdRoom= new this.roomModel({
            room_id: generatedRoomId,
            host: new mongoose.Types.ObjectId(user['_id']),
            name,
            description,
            language,
            capacity,
            password: hashedPassword,
            is_adult,
            is_music,
            is_knock,
            is_registered_only,
            is_static,
            tags,
            is_locked: hashedPassword !== '' ? true : false
        });

        try {
            await createdRoom.save();
            await this.userService.setRoom({ username: user['username'] }, generatedRoomId);
        } catch (error) {
            if(error.code === 11000) {
                throw new ConflictException('Room name already exists');
            } else {
                console.log(error);
                throw new InternalServerErrorException();
            }
        }

        return createdRoom;

    }

    /**
     * Deletes a specified room from the DB
     * @param {string} room room that will be deleted
     */
    async deleteRoom(room: Room): Promise<void> {
        try {
            await this.roomModel.deleteOne({ room_id: room.room_id }).exec();   
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Returns a fully populated room from the database.
     * WARNING: Even hashed passwords get returned
     * TODO: Remove hashed passwords getting returned
     * @param {string} room_id 
     * @returns 
     */
    async getRoom(room_id: string): Promise <Room> {

        let room = await this.roomModel.findOne(
            { room_id: room_id },
            ).populate(
                {
                    path: 'users',
                    model: 'User'
                }
                ).populate(
                    {
                        path: "messages.user",
			            model: "User"
                    }).populate(
                        {
                            path: 'host',
                            model: 'User'
                        }
                    );
        
        if(room) {
            return room;
        }
        else {
            throw new NotFoundException('Room not found.');
        }

        
    }

    /**
     * Returns all rooms from the DB, used for the lounge, only shows fields
     * the user is supposed to see on the front-end.
     * TODO: Don't send hidden rooms
     * @returns {Room[]} an array of all rooms.
     */
    async getAllRooms(): Promise<Room[]> {
        let rooms = await this.roomModel.find({}, [
                'room_id',
                'name',
                'description',
                'capacity',
                'language',
                'tags',
                'created_at',
                'host',
                'users',
                'is_static',
                'is_adult',
                'is_music',
                'is_knock',
                'is_locked',
                'is_registered_only'
        ]).populate({
                path: 'users',
                model: 'User', 
                select: {
                    _id: 1,
                    username: 1,
                    avatar: 1,
                    is_registered: 1,
                    role: 1
                }
            }).populate({
                        path: "host",
                        model: "User",
                        select: {
                            _id: 1,
                            username: 1,
                            avatar: 1,
                            is_registered: 1,
                            role: 1
                        }
                        });

        return rooms;
    }

}
