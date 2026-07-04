import db from "../src/index";
import { notesTable } from "../src/db/notes";
import { and, eq, not } from "drizzle-orm";
export async function creaeteNote(
  title: string,
  content: string | undefined,
  userId: string,
) {
  const [result] = await db
    .insert(notesTable)
    .values({
      title,
      content,
      userId,
    })
    .returning({ BookUserid: notesTable.id });
  return result;
}

export async function getBooksonly(useriD: string) {
  const data = await db
    .select({
      bookid: notesTable.id,
      title: notesTable.title,
      content: notesTable.content,
    })
    .from(notesTable)
    .where(eq(notesTable.userId, useriD));
  return data;
}

export const getBookByIdNow = async (bookid: string, userId: string) => {
  const [result] = await db
    .select({
      title: notesTable.title,
      content: notesTable.content,
    })
    .from(notesTable)
    .where(and(eq(notesTable.id, bookid), eq(notesTable.userId, userId)));
  return result;
};

interface updateBookObject {
  title?: string;
  content?: string;
}
export const updateBook = async (
  title: string | undefined,
  content: string | undefined,
  userId: string,
  bookId: string,
) => {
  const updateData: updateBookObject = {};
  if (title) {
    updateData.title = title;
  }
  if (content) {
    updateData.content = content;
  }
  const [result] = await db
    .update(notesTable)
    .set(updateData)
    .where(and(eq(notesTable.id, bookId), eq(notesTable.userId, userId)))
    .returning();

  return result;
};

export const deletingAnoteId = async (userid: string, noteid: string) => {
  const [deletedNote] = await db
    .delete(notesTable)
    .where(and(eq(notesTable.id, noteid), eq(notesTable.userId, userid)))
    .returning();
  return deletedNote;
};

export const getBooksPagination = async (
  userId: string,
  offset: number,
  limit: number,
) => {
  const result = await db
    .select({
      id: notesTable.id,
      title: notesTable.title,
      content: notesTable.content,
    })
    .from(notesTable)
    .where(eq(notesTable.userId, userId))
    .limit(limit)
    .offset(offset);

  return result;
};
