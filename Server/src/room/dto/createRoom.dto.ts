import { IsNotEmpty, IsString, MinLength, MaxLength, IsISO31661Alpha2, IsNumber, Min, IsPositive, Max, IsBoolean, ArrayMinSize, ArrayMaxSize, IsArray, IsMongoId } from "class-validator";

export class CreateRoomDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(20)
    name: string;

    @IsString()
    @MinLength(0)
    @MaxLength(300)
    description: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(2)
    @IsISO31661Alpha2() // https://en.wikipedia.org/wiki/ISO_3166-1
    language: string

    @IsNumber()
    @IsPositive()
    @Min(1)
    @Max(25)
    capacity: Number;

    @IsString()
    @MinLength(1)
    @MaxLength(32)
    password: string;

    @IsBoolean()
    @IsNotEmpty()
    is_adult: Boolean;

    @IsBoolean()
    @IsNotEmpty()
    is_music: Boolean;

    @IsBoolean()
    @IsNotEmpty()
    is_knock: Boolean;

    @IsBoolean()
    @IsNotEmpty()
    is_registered_only: Boolean;

    @IsBoolean()
    @IsNotEmpty()
    is_static: Boolean;

    // @IsBoolean()
    // @IsNotEmpty()
    // is_locked: Boolean;

    @IsArray()
    @ArrayMinSize(0)
    @ArrayMaxSize(10)
    @MinLength(2, {
        each: true
    })
    @MaxLength(10, {
        each: true
    })
    tags: string[]

}