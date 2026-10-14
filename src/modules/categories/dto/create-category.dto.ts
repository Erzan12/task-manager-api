import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Name of task category'
    })
    name: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    color?: string;
}