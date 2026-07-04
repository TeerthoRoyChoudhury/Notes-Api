import { Request, Response } from "express";
import {
  notesData,
  paramId,
  updateValidator,
  deleteaNote,
} from "../validation/notes.validator";
import {
  creaeteNote,
  getBooksonly,
  getBookByIdNow,
  updateBook,
  deletingAnoteId,
  getBooksPagination,
} from "../services/notes.services";

import { paginationQueries } from "../validation/pagination.validator";

export async function addNotes(req: Request, res: Response): Promise<void> {
  const check = await notesData.safeParseAsync(req.body);
  if (!check.success) {
    res.status(400).json({ error: check.error.issues });
    return;
  }
  const { title, content } = check.data;
  const userId = req.user.sub;
  const insertFunc = await creaeteNote(title, content, userId);
  res
    .status(200)
    .json({ status: "Successfully added", noteId: insertFunc?.BookUserid });
  return;
}

export async function getNotes(req: Request, res: Response): Promise<void> {
  const userId = req.user.sub;
  const getBooks = await getBooksonly(userId);
  if (!getBooks) {
    res.status(401).json({ error: `No books found` });
    return;
  }
  res.status(200).json({ getBooks });
}

export async function getBookById(req: Request, res: Response) {
  const check = await paramId.safeParseAsync(req.params.id);
  if (!check.success) {
    res.status(401).json({ error: "Invalid id" });
    return;
  }
  const bookId = check.data;
  const userId = req.user.sub;
  const result = await getBookByIdNow(bookId, userId);
  if (!result) {
    res.status(400).json({ error: "No such data found" });
    return;
  }
  res.status(200).json({ status: "Success", result });
  return;
}

export async function updateDetails(
  req: Request,
  res: Response,
): Promise<void> {
  const userId: string = req.user.sub;
  const check = await paramId.safeParseAsync(req.params.id);
  if (!check.success) {
    res.status(401).json({ error: check.error.issues });
    return;
  }
  const bookId: string = check.data;
  const toChange = await updateValidator.safeParseAsync(req.body);
  if (!toChange.success) {
    res.status(401).json({ error: toChange.error.issues });
    return;
  }
  const { title, content } = toChange.data;
  const confirm = await updateBook(title, content, userId, bookId);
  res.status(200).json({ status: "Success", confirm });
  return;
}

export async function deleteNote(req: Request, res: Response): Promise<void> {
  const check = await paramId.safeParseAsync(req.params.id);
  if (!check.success) {
    res.status(401).json({ error: "Invalid noteid" });
    return;
  }
  const userId = req.user.sub;
  const noteId = check.data;
  const result = await deletingAnoteId(userId, noteId);
  if (!result) {
    res.status(400).json({ error: "Unable to delete, no books found" });
    return;
  }
  res.status(200).json({ status: "Successfully delete", result });
}

export async function getBookthPaginatino(
  req: Request,
  res: Response,
): Promise<void> {
  const result = await paginationQueries.safeParseAsync(req.query);
  if (!result.success) {
    res.status(400).json({ error: result.error.issues });
    return;
  }
  const { page, limit } = result.data;
  const userId = req.user.sub;
  const offset = (page - 1) * limit;
  const books = await getBooksPagination(userId, offset, limit);
  res.status(200).json({ status: "Success", books });
  return;
}
