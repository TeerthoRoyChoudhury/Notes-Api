import express from "express";
import { checkUserLoggedIn } from "../middleware/user.auth";
const router = express.Router();
import * as notesController from "../controllers/notes.controller";
router.post("/notespost", checkUserLoggedIn, notesController.addNotes);
router.get("/notesget", checkUserLoggedIn, notesController.getNotes);
router.get("/:id", checkUserLoggedIn, notesController.getBookById);
router.put("/:id", checkUserLoggedIn, notesController.updateDetails);
router.delete("/:id", checkUserLoggedIn, notesController.deleteNote);
(router.get("/getBooks?:page&:limit", checkUserLoggedIn),
  notesController.getBookthPaginatino);
export default router;
