"use server";

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function submitBookingEnquiry(formData: FormData) {
  try {
    const checkIn = new Date(formData.get('arrivalDate') as string)
    const checkOut = new Date(formData.get('departureDate') as string)
    const guests = parseInt(formData.get('adults') as string) + parseInt(formData.get('children') as string)
    
    await prisma.bookingEnquiry.create({
      data: {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        checkIn: isNaN(checkIn.getTime()) ? new Date() : checkIn,
        checkOut: isNaN(checkOut.getTime()) ? new Date() : checkOut,
        guests: isNaN(guests) ? 2 : guests,
        suiteId: formData.get('suite') as string,
        specialNotes: formData.get('requests') as string,
      }
    })

    return { success: true }
  } catch (error) {
    console.error("Booking error", error)
    return { success: false, error: "Failed to submit booking" }
  }
}
