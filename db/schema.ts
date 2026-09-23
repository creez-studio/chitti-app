import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const accounts = sqliteTable('accounts', { id: text('id').primaryKey(), name: text('name').notNull(), login: text('login').notNull().unique(), password: text('password').notNull() });
export const sessions = sqliteTable('sessions', { token: text('token').primaryKey(), user: text('user').notNull(), expires: integer('expires').notNull() });
export const circles = sqliteTable('circles', { id: text('id').primaryKey(), owner: text('owner').notNull(), data: text('data').notNull(), version: integer('version').notNull().default(0) });
export const attempts = sqliteTable('attempts', { key: text('key').primaryKey(), count: integer('count').notNull(), expires: integer('expires').notNull() });
