'use server';

import { z } from 'zod';
import { supabase } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

// --- UTILITIES ---

const AADHAAR_REGEX = /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g;
const SANITIZE_REGEX = /[^a-zA-Z0-9\s.,!?'"()]/g;

function sanitizeInput(text: string): string {
  let sanitized = text.replace(AADHAAR_REGEX, '[AADHAAR REDACTED]');
  sanitized = sanitized.replace(SANITIZE_REGEX, '');
  return sanitized;
}

// --- ZOD SCHEMAS ---

const GuestQuestionSchema = z.object({
  question: z.string().min(15, 'Sawaal kam se kam 15 akshar ka hona chahiye.').max(500),
  category: z.string(),
  guest_name: z.string().max(50).optional(),
  guest_mobile: z.string().max(15).optional(),
});

const GuestAnswerSchema = z.object({
  content: z.string().min(20, 'Jawaab kam se kam 20 akshar ka hona chahiye.').max(2000),
  question_id: z.string().uuid(),
  guest_name: z.string().max(50).optional(),
  guest_mobile: z.string().max(15).optional(),
});

// --- SERVER ACTIONS ---

interface FormState {
  success: boolean;
  message: string;
  errors?: Record<string, string[] | undefined>;
}

/**
 * Submits a new community question as a guest.
 */
export async function submitGuestQuestion(prevState: FormState, formData: FormData): Promise<FormState> {
  const validation = GuestQuestionSchema.safeParse(Object.fromEntries(formData));

  if (!validation.success) {
    return {
      success: false,
      message: 'Invalid form data. Please check your inputs.',
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const sanitizedQuestion = sanitizeInput(validation.data.question);
  const sanitizedName = validation.data.guest_name ? sanitizeInput(validation.data.guest_name) : null;

  const { error } = await supabase.from('community_questions').insert([{
    question: sanitizedQuestion,
    category: validation.data.category,
    guest_name: sanitizedName,
    guest_mobile: validation.data.guest_mobile,
    status: 'pending', // Always set to pending for moderation
  }]);

  if (error) {
    return {
      success: false,
      message: `Database Error: ${error.message}`,
    };
  }

  revalidatePath('/community');

  return {
    success: true,
    message: 'Aapka sawaal safaltapoorvak post ho gaya hai. Admin approval ke baad yeh live ho jayega.',
  };
}

/**
 * Submits a new answer to a question as a guest.
 */
export async function submitGuestAnswer(prevState: FormState, formData: FormData): Promise<FormState> {
  const validation = GuestAnswerSchema.safeParse(Object.fromEntries(formData));

  if (!validation.success) {
    return {
      success: false,
      message: 'Invalid form data. Please check your inputs.',
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const sanitizedContent = sanitizeInput(validation.data.content);
  const sanitizedName = validation.data.guest_name ? sanitizeInput(validation.data.guest_name) : null;

  const { error } = await supabase.from('answers').insert([{
    content: sanitizedContent,
    question_id: validation.data.question_id,
    guest_name: sanitizedName,
    guest_mobile: validation.data.guest_mobile,
    status: 'pending', // Always set to pending
  }]);

  if (error) {
    return {
      success: false,
      message: `Database Error: ${error.message}`,
    };
  }

  revalidatePath(`/community/question/${validation.data.question_id}`);

  return {
    success: true,
    message: 'Aapka jawaab post ho gaya hai. Admin approval ke baad yeh live ho jayega.',
  };
}
