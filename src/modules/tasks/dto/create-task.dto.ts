import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { TasksPriority, tasksPriorityEnum } from "src/database/schema";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

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