"use server";

import { Resend } from "resend";
import { contactSchema } from "@/lib/schema";

const resend = new Resend(process.env.RESEND_API_KEY);

type ActionResult = { success: true } | { success: false; error: string };

export async function sendContactEmail(formData: FormData): Promise<ActionResult> {
  if (formData.get("website")) {
    return { success: true };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  const { name, email, message } = parsed.data;

  try {
    await resend.emails.send({
      from: "Portfolio <contact@moizz.dev>",
      to: process.env.CONTACT_EMAIL ?? "abdul2005moizzz@gmail.com",
      replyTo: email,
      subject: `Portfolio inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
    return { success: true };
  } catch {
    return { success: false, error: "Failed to send message. Please try again." };
  }
}
