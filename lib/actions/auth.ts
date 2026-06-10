'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

// Define a unified, type-safe return structure for all actions.
// This prevents implicit 'any' types on the client.
export type ActionResult = {
  success: boolean;
  message: string;
  error?: {
    path: (string | number)[];
    message: string;
  }[] | null;
};

// Helper to create a Supabase server client
function createSupabaseServerClient() {
  const cookieStore = cookies();
  // NOTE: Using SUPABASE_SECRET_KEY for server-side actions is correct.
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // This can fail during Next.js build.
          }
        },
        remove(name: string, options) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // This can fail during Next.js build.
          }
        },
      },
    }
  );
}

// --- PASSWORD AUTHENTICATION ACTIONS ---

const PasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export async function signUpWithPassword(formData: FormData): Promise<ActionResult> {
  try {
    const validation = PasswordSchema.safeParse(Object.fromEntries(formData));
    if (!validation.success) {
      return { 
        success: false, 
        message: 'Invalid form data.', 
        error: validation.error.errors 
      };
    }

    const { email, password } = validation.data;
    const supabase = createSupabaseServerClient();

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      // Data Masking: Log internal errors without exposing sensitive user info.
      console.error('SignUpError: [Email Redacted]', { message: error.message });
      return { success: false, message: error.message };
    }

    revalidatePath('/', 'layout'); // Refresh user session info across the app
    return { success: true, message: 'Sign up successful and logged in.' };

  } catch (e: any) {
    console.error('Unexpected SignUp Error: [Input Masked]', { message: e.message });
    return { success: false, message: 'An unexpected error occurred.' };
  }
}

export async function signInWithPassword(formData: FormData): Promise<ActionResult> {
  try {
    const validation = PasswordSchema.safeParse(Object.fromEntries(formData));
    if (!validation.success) {
      return { 
        success: false, 
        message: 'Invalid form data.', 
        error: validation.error.errors 
      };
    }

    const { email, password } = validation.data;
    const supabase = createSupabaseServerClient();

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error('SignInError: [Email Redacted]', { message: error.message });
      return { success: false, message: 'Invalid credentials.' }; // Generic message for security
    }

    revalidatePath('/', 'layout');
    return { success: true, message: 'Sign in successful.' };

  } catch (e: any) {
    console.error('Unexpected SignIn Error: [Input Masked]', { message: e.message });
    return { success: false, message: 'An unexpected error occurred.' };
  }
}

// --- MOBILE OTP AUTHENTICATION ACTIONS ---

const PhoneSchema = z.object({
  phone: z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit mobile number.'),
});

export async function sendMobileOTP(formData: FormData): Promise<ActionResult> {
  try {
    const validation = PhoneSchema.safeParse(Object.fromEntries(formData));
    if (!validation.success) {
      return { 
        success: false, 
        message: 'Invalid phone number.',
        error: validation.error.errors 
      };
    }

    const { phone } = validation.data;
    const supabase = createSupabaseServerClient();

    // Important: Supabase requires the country code for phone auth. Assuming India (+91).
    const formattedPhone = `+91${phone}`;

    const { error } = await supabase.auth.signInWithOtp({
      phone: formattedPhone,
    });

    if (error) {
      console.error('SendOTPError: [Phone Redacted]', { message: error.message });
      return { success: false, message: error.message };
    }

    return { success: true, message: 'An OTP has been sent to your mobile number.' };

  } catch (e: any) {
    console.error('Unexpected SendOTP Error: [Input Masked]', { message: e.message });
    return { success: false, message: 'An unexpected error occurred.' };
  }
}


const OTPSchema = z.object({
  phone: z.string().regex(/^\d{10}$/, 'Invalid phone number format.'),
  token: z.string().regex(/^\d{6}$/, 'OTP must be 6 digits.'),
});

export async function verifyMobileOTP(formData: FormData): Promise<ActionResult> {
  try {
    const validation = OTPSchema.safeParse(Object.fromEntries(formData));
    if (!validation.success) {
      return { 
        success: false, 
        message: 'Invalid OTP or phone number.',
        error: validation.error.errors
      };
    }

    const { phone, token } = validation.data;
    const supabase = createSupabaseServerClient();
    
    const formattedPhone = `+91${phone}`;

    const { error } = await supabase.auth.verifyOtp({
      phone: formattedPhone,
      token: token,
      type: 'sms', // Explicitly setting type to 'sms'
    });

    if (error) {
      console.error('VerifyOTPError: [Phone Redacted]', { message: error.message });
      return { success: false, message: 'The OTP is incorrect or has expired.' }; // User-friendly error
    }

    revalidatePath('/', 'layout'); // Revalidate and refresh session
    return { success: true, message: 'Verification successful. You are now signed in!' };

  } catch (e: any) {
    console.error('Unexpected VerifyOTP Error: [Input Masked]', { message: e.message });
    return { success: false, message: 'An unexpected error occurred.' };
  }
}
