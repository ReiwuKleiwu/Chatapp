import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
    @Prop({
        minlength: 4,
        maxlength: 4,
        required: true
    })
    room_id: string;

    @Prop({
        minlength: 1,
        maxlength: 20, 
        trim: true,
        unique: true,
        required: true
    })
    name: string;

    @Prop({
        minlength: 0,
        maxlength: 300,
        trim: true,
        required: false
    })
    description: string;

    @Prop({ 
        minlength: 0,
        maxlength: 100,
        required: false
     })
    password: string;

    @Prop({
        min: 1,
        max: 25,
        required: true
    })
    capacity: number;

    @Prop({ required: true })
    language: string;

    @Prop({
        minlength: 0,
        maxlength: 10,
        default: [],
        required: false
    })
    tags: string[];

    @Prop({
        default: Date.now(),
        required: true
    })
    created_at: Date;

    @Prop({ 
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
     })
    host: User;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    users: User[];

    @Prop({
         required: true,
         default: []
         })
    banned_users: string[];

    @Prop({
        required: false,
        default: []
    })
    messages: Message[];

    @Prop({ required: true })
    is_static: Boolean;

    @Prop({ required: true })
    is_adult: Boolean;

    @Prop({ required: true })
    is_music: Boolean;

    @Prop({ required: true })
    is_knock: Boolean;

    @Prop({ required: true })
    is_locked: Boolean;

    @Prop({ required: true })
    is_registered_only: Boolean;

}

@Schema()
class Message { 
 
    @Prop({ 
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
     })
    author: User;

    @Prop({
        minlength: 1,
        maxlength: 300,
        required: true})
    content: string;

    @Prop({ 
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
     })
    to: User;

    @Prop({
        match: /^(message|dm|info)$/,
        required: true})
    type: string;

    @Prop({
        default: Date.now(),
        required: true})
    created_at: Date;

    @Prop({ required: false })
    imagePath: string;

}

export const RoomSchema = SchemaFactory.createForClass(Room);