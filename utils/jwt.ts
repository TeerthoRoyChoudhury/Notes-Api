import jwt from "jsonwebtoken";

export interface payLoadtype {
  sub: string;
}

export function generateToken(payload: payLoadtype): string {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
}

export function verifyToken(token: string | undefined): payLoadtype {
  return jwt.verify(token!, process.env.JWT_SECRET!) as payLoadtype;
}
