import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        example: 'dojan@gmail.com'
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '1234'
    })
    password: string;
}