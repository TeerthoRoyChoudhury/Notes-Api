import { integer, pgTable, varchar, uuid } from "drizzle-orm/pg-core";
import { usersTable } from "./user";

export const notesTable = pgTable("notes", {
  id: uuid("Id").notNull().defaultRandom(),
  title: varchar("Title", { length: 255 }).notNull(),
  content: varchar("Content", { length: 500 }),
  userId: uuid("User_Id")
    .notNull()
    .references(() => usersTable.id),
});
