import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ExecOptionsWithStringEncoding } from 'child_process';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {  
    @Prop({ 
        required: true, 
        minlength: 1,
        maxlength: 20,
        unique: true
        })
    username: string; 
    
    @Prop({ 
        required: false,
        default: ''
    })
    password: string;

    @Prop({
        required: false,
        default: ''
    })
    email: string;

    @Prop({
        default: false,
        required: true
    })
    is_registered: Boolean;

    @Prop({
        required: true,
        default: 'icon_bakyura'
    })
    avatar: string;

    @Prop({
        minlength: 0,
        maxlength: 4,
        default: '',
        required: false
    })
    room_id: string;

    @Prop({
        default: Date.now(),
        required: false
    })
    logged_at: number;

    @Prop({ required: false })
    registered_at: number;

    @Prop({
        default: Date.now(),
        required: false
    })
    updated_at: number;

    @Prop({ required: true })
    ip_adress: string;
   
}

export const UserSchema = SchemaFactory.createForClass(User);