import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "@/app/prisma";

export async function Login(email: string, password: string) {
  if (!email || !password) {
    console.log("email or password is required");
    return null;
  }

  try {
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      console.log("User not found");
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password is incorrect");
      return null;
    }
    const accessToken = jwt.sign(
      { email: user?.email, name: user?.name },
      process.env.ACCESS_TOKEN_SECRET ?? "",
      { expiresIn: "1h" }
    );

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      token: accessToken,
    };
  } catch (err) {
    console.log("error when try to Login => ", err);
    return null;
  }
}
