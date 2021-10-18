import { IsNotEmpty, IsString, MinLength, MaxLength, Matches, IsIn, IsEmail } from "class-validator";
import { avatars } from "../avatars/avatars";

export class LoginUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    username: string;

    //@Matches() Some Regex
    @IsString()
    password: string;

    @IsIn(avatars)
    avatar: string;

}


