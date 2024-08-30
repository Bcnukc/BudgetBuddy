"use server";

import { db } from "@/database";
import { users } from "@/database/schema";
import { lucia } from "@/lib/auth";
import { hash } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";

export default async function signup(data: {
  name: string;
  email: string;
  password: string;
}) {
  const { name, email, password } = data;
  console.log(name);

  if (!name || !email || !password) {
    throw new Error("Missing required fields");
  }

  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length > 0) {
      throw new Error("Email already in use");
    }

    const userId = generateId(15);
    const passwordHash = await hash(password);

    await db.insert(users).values({
      id: userId,
      name,
      email,
      password: passwordHash,
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    return {
      success: true,
      message: "Account created successfully",
      sessionCookie: sessionCookie.serialize(),
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
