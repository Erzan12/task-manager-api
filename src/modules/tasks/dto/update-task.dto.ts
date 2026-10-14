import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { TasksPriority, tasksPriorityEnum } from "src/database/schema";

export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        example: 'Task title'
    })
    title?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        example: 'Task description',
    })
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
    @ApiPropertyOptional({
        example: '2026-10-20',
    })
    dueDate?: string;

    @IsUUID()
    @IsOptional()
    @ApiPropertyOptional({
        example:'Category PK UUID',
    })
    category_id?: string;
}