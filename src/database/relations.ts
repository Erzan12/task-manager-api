import { defineRelations } from 'drizzle-orm';
import * as schema from '../database/schema';

export const relations = defineRelations(schema, (r) => ({
  // define relations here; an empty object is fine if you have none yet
  // users: {
  //   tasks: r.many.tasks(),
  // },
}));