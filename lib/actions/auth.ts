'use server';

import { createServer } from '@/lib/supabase/utils';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// Common type for action results
export type ActionResult = {
  success: boolean;
  message: string;
};

// --- Schema Definitions ---
const EmailPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const PhoneSchema = z.object({
  phone: z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit mobile number'),
});

const VerifyOTPSchema = z.object({
  phone: z.string().regex(/^\d{10}$/, 'Invalid phone number format'),
  token: z.string().min(6, 'OTP must be 6 digits').max(6, 'OTP must be 6 digits'),
});


// --- Password Authentication ---
export async function signInWithPassword(formData: FormData): Promise<ActionResult> {
  const supabase = createServer();
  const validation = EmailPasswordSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validation.success) {
    return { success: false, message: validation.error.errors.map(e => e.message).join(', ') };
  }

  const { email, password } = validation.data;
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { success: false, message: `Authentication failed: ${error.message}` };
  }

  revalidatePath('/', 'layout');
  return { success: true, message: 'Successfully signed in!' };
}

export async function signUpWithPassword(formData: FormData): Promise<ActionResult> {
  const supabase = createServer();
  const validation = EmailPasswordSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validation.success) {
    return { success: false, message: validation.error.errors.map(e => e.message).join(', ') };
  }

  const { email, password } = validation.data;
  const { error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
      }
    });

  if (error) {
    return { success: false, message: `Sign-up failed: ${error.message}` };
  }

  return { success: true, message: 'Sign-up successful! Please check your email to verify.' };
}

// --- Mobile OTP Authentication ---
export async function sendMobileOTP(formData: FormData): Promise<ActionResult> {
  const supabase = createServer();
  const validation = PhoneSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validation.success) {
    return { success: false, message: validation.error.errors.map(e => e.message).join(', ') };
  }
  
  const { phone } = validation.data;
  
  const { error } = await supabase.auth.signInWithOtp({
    phone: `+91${phone}`, // Assuming Indian numbers
  });

  if (error) {
    return { success: false, message: `Failed to send OTP: ${error.message}` };
  }

  return { success: true, message: 'OTP sent to your mobile number.' };
}

export async function verifyMobileOTP(formData: FormData): Promise<ActionResult> {
  const supabase = createServer();
  const validation = VerifyOTPSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validation.success) {
      return { success: false, message: validation.error.errors.map(e => e.message).join(', ') };
  }
  
  const { phone, token } = validation.data;

  const { error } = await supabase.auth.verifyOtp({
    phone: `+91${phone}`,
    token: token,
    type: 'sms'
  });

  if (error) {
    return { success: false, message: `Failed to verify OTP: ${error.message}` };
  }

  revalidatePath('/', 'layout');
  return { success: true, message: 'Successfully verified and signed in!' };
}


// --- Existing Functions (retained and updated) ---

export async function signInWithEmail(email: string) {
    const supabase = createServer();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
      }
    });
    return { error };
}

export async function signInWithGoogle() {
    const supabase = createServer();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
      }
    });
    return { data, error };
}

export async function signOut() {
    const supabase = createServer();
    const { error } = await supabase.auth.signOut();
    revalidatePath('/', 'layout');
    return { error };
}
