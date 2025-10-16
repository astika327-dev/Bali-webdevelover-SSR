import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    // Ganti 'required_error' dengan .min(1, ...) untuk validasi wajib diisi
    .min(1, { message: 'Please enter your name' }) 
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(80, { message: 'Name is too long' }),
  
  email: z
    .string()
    .trim()
    // Terapkan perbaikan yang sama untuk email
    .min(1, { message: 'Please enter an email address' }) 
    .email({ message: 'Please enter a valid email address' })
    .max(120, { message: 'Email is too long' }),

  // 'whatsapp' sudah benar karena menggunakan .optional() dan tidak memerlukan 'required_error'
  whatsapp: z
    .string()
    .optional()
    .transform((value) => (value ?? '').trim())
    .refine(
      (value) => !value || /^[+\d\s().-]{7,20}$/.test(value),
      'Enter a valid WhatsApp number'
    )
    .transform((value) => (value ? value.replace(/\s+/g, '') : undefined)),
    
  message: z
    .string()
    .trim()
    // Terapkan perbaikan yang sama untuk message
    .min(1, { message: 'Please share project details' })
    .min(30, { message: 'Please share at least 30 characters so we can prepare properly' })
    .max(1500, { message: 'Message is too long' }),
});

export type ContactPayload = z.infer<typeof contactSchema>;