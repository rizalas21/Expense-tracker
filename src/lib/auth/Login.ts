import bcrypt from "bcrypt";
import { prisma } from "@/lib/auth/prisma";

export async function Login(email: string, password: string) {
  if (!email || !password) {
    return { error: "EMAIL_OR_PASSWORD_REQUIRED" };
  }

  try {
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return { error: "USER_NOT_FOUND" };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { error: "INVALID_PASSWORD" };
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  } catch (err) {
    console.log("error when try to Login => ", err);
    return { error: "INTERNAL_ERROR" };
  }
}
