import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string({ required_error: 'Please enter your name' })
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name is too long'),
  email: z
    .string({ required_error: 'Please enter an email address' })
    .trim()
    .email('Please enter a valid email address')
    .max(120, 'Email is too long'),
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
    .string({ required_error: 'Please share project details' })
    .trim()
    .min(30, 'Please share at least 30 characters so we can prepare properly')
    .max(1500, 'Message is too long'),
});

export type ContactPayload = z.infer<typeof contactSchema>;
