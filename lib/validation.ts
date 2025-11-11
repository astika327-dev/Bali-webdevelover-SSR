import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .trim() 
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(80, { message: 'Name is too long' }),
  
  email: z
    .string()
    .trim() 
    .email({ message: 'Please enter a valid email address' })
    .max(120, { message: 'Email is too long' }),

  // 'whatsapp' sudah benar karena menggunakan .optional() dan tidak memerlukan 'required_error'
  whatsapp: z
    .string()
    .optional()
    .transform((value) => (value ?? '').trim())
    .transform((value) => (value ? value.replace(/\s+/g, '') : undefined))
    .refine(
      (value) => !value || /^[+\d\s().-]{7,20}$/.test(value),
      'Enter a valid WhatsApp number'
    ),
    
  message: z
    .string()
    .trim() 
    .min(30, { message: 'Please share at least 30 characters so we can prepare properly' })
    .max(1500, { message: 'Message is too long' }),
});

export type ContactPayload = z.infer<typeof contactSchema>;