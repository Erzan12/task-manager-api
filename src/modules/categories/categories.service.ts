import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DATABASE, Database } from 'src/database/database.provider';
import { categories, users } from 'src/database/schema';
import { RequestUser } from 'src/utils/types/request-user.interface';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @Inject(DATABASE)
        private readonly db: Database
    ) {}

    private async assertAccess(userId: string) {
        const existingUser = await this.db.query.users.findFirst({
            where: eq(users.id, userId)
        });

        if (!existingUser || existingUser.is_active === false) {
            throw new BadRequestException('Session user is not allowed to perform this action, might not exists or inactive.');
        }

        return existingUser;
    }

    async getCategory(categoryId: string, user: RequestUser) {
        await this.assertAccess(user.id);

        const category = await this.db.query.categories.findFirst({
            where: eq(categories.id, categoryId),
        })

        if (!category) {
            throw new BadRequestException('Category does not exists.');
        }

        return {
            status: 'success',
            message: 'Here is the category',
            category,
        };
    }

    async getCategories(user: RequestUser) {
        await this.assertAccess(user.id);

        const categoriesList = await this.db.query.categories.findMany();

        if (categoriesList.length === 0) {
            throw new BadRequestException('No categories added.');
        }

        return {
            status: 'success',
            message: 'List of categories',
            categoriesList,
        };
    }

    async createCategory(
        dto: CreateCategoryDto,
        user: RequestUser,
    ) {
        await this.assertAccess(user.id);

        const category = await this.db
            .insert(categories)
            .values({
                name: dto.name,
                color: dto.color,
                userId: user.id,
            })
            .returning();

        return {
            status: 'success',
            message: 'Category created successfully',
            category,
        };
    }

    async updateCategory(
        dto: UpdateCategoryDto,
        user: RequestUser,
        categoryId: string,
    ) {
        await this.assertAccess(user.id);

        const existingCategory = await this.db.query.categories.findFirst({
            where: eq(categories.id, categoryId)
        })

        if (!existingCategory) {
            throw new BadRequestException('Category does not exists.');
        }

        const category = await this.db
            .update(categories)
            .set({
                name: dto.name ?? existingCategory.name,
                color: dto.color ?? existingCategory.color,
            })
            .returning();

        return {
            status: 'success',
            message: 'Category updated successfully',
            category
        }
    }
}
