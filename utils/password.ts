import argon2 from "argon2";

export async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await argon2.hash(password, {
    type: argon2.argon2id,
  });
  return hashedPassword;
}

export async function verifyPassword(
  hashedpassword: string,
  plainpassword: string,
): Promise<boolean> {
  return argon2.verify(hashedpassword, plainpassword);
}
