import { Provider } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { relations } from './relations';

const createDb = () => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  return drizzle({
    client: pool,
    relations,
  });
};

export type Database = ReturnType<typeof createDb>;

export const DATABASE = Symbol('DATABASE');

export const databaseProvider: Provider = {
  provide: DATABASE,
  useFactory: createDb,
};

// with relations
// import { Provider } from '@nestjs/common';
// import { drizzle } from 'drizzle-orm/node-postgres';
// import { Pool } from 'pg';
// import { relations } from './relations';

// export const DATABASE = Symbol('DATABASE');

// export type Database = ReturnType<typeof createDb>;

// const createDb = () => {
//   const pool = new Pool({ connectionString: process.env.DATABASE_URL });
//   return drizzle({ client: pool, relations });
// };

// export const databaseProvider: Provider = {
//   provide: DATABASE,
//   useFactory: createDb,
// };