"use server";

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function submitContactMessage(formData: FormData) {
  try {
    await prisma.contactMessage.create({
      data: {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        subject: formData.get('subject') as string,
        message: formData.get('message') as string,
      }
    })

    return { success: true }
  } catch (error) {
    console.error("Contact error", error)
    return { success: false, error: "Failed to submit message" }
  }
}
