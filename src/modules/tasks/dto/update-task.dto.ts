import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TasksPriority, tasksPriorityEnum } from "src/database/schema";

export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsEnum(tasksPriorityEnum.enumValues)
    @IsOptional()
    @ApiPropertyOptional({
        enum: tasksPriorityEnum.enumValues,
        example: "HIGH",
    })
    priority?: TasksPriority;

    @IsDateString()
    @IsOptional()
    dueDate?: string;
}