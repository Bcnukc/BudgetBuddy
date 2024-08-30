"use server";

import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/database";
import { users } from "@/database/schema";
import { lucia } from "@/lib/auth";
import { isValidEmail } from "@/lib/utils";

export interface ActionResult {
  error: string | null;
}

export async function login(data: {
  email: string;
  password: string;
}): Promise<ActionResult> {
  const { email, password } = data;

  if (!isValidEmail(email)) {
    return { error: "Invalid email" };
  }

  if (typeof password !== "string" || password.length < 6) {
    return { error: "Invalid password" };
  }

  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user.length || !user[0].password) {
      return { error: "Invalid email or password" };
    }

    const validPassword = await verify(user[0].password, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    if (!validPassword) {
      return { error: "Invalid email or password" };
    }

    const session = await lucia.createSession(user[0].id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return { error: null };
  } catch (e) {
    console.error("Login error:", e);
    return { error: "An unexpected error occurred. Please try again." };
  }
}
