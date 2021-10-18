import { IsNotEmpty, IsString, MinLength, MaxLength, Matches, IsIn, IsEmail } from "class-validator";
import { avatars } from "../avatars/avatars";

export class RegisterUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    username: string;

    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(32)
    //@Matches() Some Regex
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsIn(avatars, {
        message: 'Please choose a valid avatar.'
    })
    avatar: string;

}