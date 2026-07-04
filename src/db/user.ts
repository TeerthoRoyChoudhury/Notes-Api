import { integer, pgTable, varchar, uuid } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("Id").primaryKey().defaultRandom(),
  name: varchar("Name", { length: 255 }).notNull(),
  email: varchar("Email", { length: 255 }).notNull().unique(),
  password: varchar("Password", { length: 100 }).notNull(),
});
