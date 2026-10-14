import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { SessionUser } from 'src/utils/decorators/session-user.decorator';
import { RequestUser } from 'src/utils/types/request-user.interface';
import { ApiOperation } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) {}

    @Get()
    @ApiOperation({ summary: 'Get the list of categories' })
    getCategories(
        @SessionUser() user: RequestUser,
    ) {
        return this.categoriesService.getCategories(user);
    }

    @Get('/:categoryId')
    @ApiOperation({ summary: 'Get a single category' })
    getCategory(
        @Param('categoryId', ParseUUIDPipe) categoryId: string,
        @SessionUser() user: RequestUser,
    ) {
        return this.categoriesService.getCategory(categoryId, user);
    }

    @Post()
    @ApiOperation({ summary: 'Create a category' })
    createCategory(
        @Body() dto: CreateCategoryDto,
        @SessionUser() user: RequestUser,
    ) {
        return this.categoriesService.createCategory(dto, user);
    }

    @Patch('/:categoryId')
    @ApiOperation({ summary: 'Update category details' })
    updateCategory(
        @Body() dto: UpdateCategoryDto,
        @SessionUser() user: RequestUser,
        @Param('categoryId', ParseUUIDPipe) categoryId: string,
    ) {
        return this.categoriesService.updateCategory(dto, user, categoryId);
    }
}
