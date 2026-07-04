import db from "../src/index";
import { usersTable } from "../src/db/user";
import { eq } from "drizzle-orm";

interface checkuser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export async function ifExist(email: string): Promise<checkuser | undefined> {
  const [result] = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      password: usersTable.password,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  return result;
}

export async function addUser(name: string, email: string, hpassword: string) {
  const [data] = await db
    .insert(usersTable)
    .values({
      name,
      email,
      password: hpassword,
    })
    .returning({ UserId: usersTable.id });
  return data;
}
