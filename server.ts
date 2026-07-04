import express, { Request, Response } from "express";
import userRouter from "./router/user.router";
import notesRouter from "./router/notes.router";
const app = express();
const PORT = 8000;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ status: "Welcome to my server" });
});

app.use("/user", userRouter);
app.use("/notes", notesRouter);

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
