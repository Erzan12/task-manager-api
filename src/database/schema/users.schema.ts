import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { tasks } from './task.schema';

export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    email: text('email').notNull().unique(),
    name: varchar('name', {
        length: 255,
    }).notNull(),
    username: varchar('username', {
        length: 255,
    }).notNull().unique(),
    password: varchar('password').notNull(),
    is_active: boolean('is_active').default(true).notNull(),
    token_version: integer('token_version').default(0).notNull(),
    last_login: timestamp('last_login').defaultNow().notNull(),
    createdAt: timestamp('created_at')
        .defaultNow()
        .notNull(),
    updatedAt: timestamp('updated_at')
        .defaultNow()
        .notNull()
});

export const userRelations = relations(users, ({ many }) => ({
    tasks: many(tasks),
}));