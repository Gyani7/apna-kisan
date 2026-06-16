'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { AuthError } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

// A more generic action result type
export type ActionAuthResult<T = null> = {
  success: boolean;
  message: string;
  data: T | null;
  error: { message: string; details: string } | null;
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


// Helper to format error
const formatError = (error: AuthError | Error | null) => {
    if (!error) return null;
    return { message: error.message, details: (error as AuthError).cause?.toString() || '' };
}

// --- Password Authentication ---
export async function signInWithPassword(formData: FormData): Promise<ActionAuthResult> {
  const supabase = createSupabaseServerClient();
  const validation = EmailPasswordSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validation.success) {
    const message = validation.error.errors.map(e => e.message).join(', ');
    return { success: false, message, data: null, error: { message, details: '' } };
  }

  const { email, password } = validation.data;
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { success: false, message: 'Authentication failed', data: null, error: formatError(error) };
  }

  revalidatePath('/', 'layout');
  return { success: true, message: 'Successfully signed in!', data: null, error: null };
}

export async function signUpWithPassword(formData: FormData): Promise<ActionAuthResult> {
  const supabase = createSupabaseServerClient();
  const validation = EmailPasswordSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validation.success) {
    const message = validation.error.errors.map(e => e.message).join(', ');
    return { success: false, message, data: null, error: { message, details: '' } };
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
    return { success: false, message: 'Sign-up failed', data: null, error: formatError(error) };
  }

  return { success: true, message: 'Sign-up successful! Please check your email to verify.', data: null, error: null };
}

// --- Mobile OTP Authentication ---
export async function sendMobileOTP(formData: FormData): Promise<ActionAuthResult> {
  const supabase = createSupabaseServerClient();
  const validation = PhoneSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validation.success) {
    const message = validation.error.errors.map(e => e.message).join(', ');
    return { success: false, message, data: null, error: { message, details: '' } };
  }
  
  const { phone } = validation.data;
  
  const { error } = await supabase.auth.signInWithOtp({
    phone: `+91${phone}`,
  });

  if (error) {
    return { success: false, message: 'Failed to send OTP', data: null, error: formatError(error) };
  }

  return { success: true, message: 'OTP sent to your mobile number.', data: null, error: null };
}

export async function verifyMobileOTP(formData: FormData): Promise<ActionAuthResult> {
  const supabase = createSupabaseServerClient();
  const validation = VerifyOTPSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validation.success) {
      const message = validation.error.errors.map(e => e.message).join(', ');
      return { success: false, message, data: null, error: { message, details: '' } };
  }
  
  const { phone, token } = validation.data;

  const { error } = await supabase.auth.verifyOtp({
    phone: `+91${phone}`,
    token: token,
    type: 'sms'
  });

  if (error) {
    return { success: false, message: 'Failed to verify OTP', data: null, error: formatError(error) };
  }

  revalidatePath('/', 'layout');
  return { success: true, message: 'Successfully verified and signed in!', data: null, error: null };
}


// --- Email Link Authentication ---
export async function signInWithEmail(email: string): Promise<ActionAuthResult> {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
      }
    });
    if (error) {
        return { success: false, message: 'Failed to send magic link.', data: null, error: formatError(error) };
    }
    return { success: true, message: 'Magic link sent to your email.', data: null, error: null };
}

// --- OAuth (Google) Authentication ---
export async function signInWithGoogle(): Promise<ActionAuthResult<{ url: string | null }>> {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
      }
    });
     if (error) {
        return { success: false, message: 'Google sign-in failed.', data: null, error: formatError(error) };
    }
    return { success: true, message: 'Redirecting to Google for authentication...', data: { url: data.url }, error: null };
}

// --- Sign Out ---
export async function signOut(): Promise<ActionAuthResult> {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
        return { success: false, message: 'Sign-out failed.', data: null, error: formatError(error) };
    }
    revalidatePath('/', 'layout');
    return { success: true, message: 'Successfully signed out.', data: null, error: null };
}
