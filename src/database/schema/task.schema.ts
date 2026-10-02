import { pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users.schema";
import { categories } from "./categories.schema";
import { relations } from "drizzle-orm";

export const taskStatusEnum = pgEnum('task_status', ['TODO', 'IN_PROGRESS', 'COMPLETED', 'ARCHIEVED']);
export const tasksPriorityEnum = pgEnum('task_priority', ['LOW', 'MEDIUM', 'HIGH', 'URGENT']);

export const tasks = pgTable('tasks', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: varchar('title', { length: 255}).notNull(),
    description: text('description'),
    status: taskStatusEnum('status').default('TODO').notNull(),
    priority: tasksPriorityEnum('priority').default('MEDIUM').notNull(),
    dueDate: timestamp('due_date'),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    categoryId: uuid('category_id').references(() => categories.id, { onDelete: 'set null' }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const taskRelations = relations(tasks, ({ one }) => ({
  author: one(users, {
    fields: [tasks.userId],
    references: [users.id], 
  }),

  category: one(categories, {
    fields: [tasks.categoryId],
    references: [categories.id],
  }),
}));
