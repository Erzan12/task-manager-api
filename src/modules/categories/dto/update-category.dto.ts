import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateCategoryDto {
    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        example: 'Name of task category'
    })
    name?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    color?: string;
}