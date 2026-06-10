'use client';

import { useState, useTransition } from 'react';
import { ActionResult, signInWithPassword, signUpWithPassword, sendMobileOTP, verifyMobileOTP } from '@/lib/actions/auth';
import { Button } from '@/components/ui/button'; // Assuming a UI component library

// --- Helper components for displaying form state ---
function FormFeedback({ message, type }: { message: string; type: 'error' | 'success' }) {
  if (!message) return null;
  const baseClasses = 'px-4 py-2 my-2 text-sm font-medium rounded-md';
  const typeClasses = type === 'error' 
    ? 'bg-red-100 text-red-700' 
    : 'bg-green-100 text-green-700';
  return <div className={`${baseClasses} ${typeClasses}`}>{message}</div>;
}

// --- Password Authentication Form ---

export function AuthForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, action: (formData: FormData) => Promise<ActionResult>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      const formData = new FormData(e.currentTarget);
      const result = await action(formData);
      if (result.success) {
        setSuccess(result.message);
        // On success, Next.js router would typically redirect based on the new session state.
      } else {
        setError(result.message);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Sign In or Sign Up</h2>
        <p className="text-gray-600">Enter your email and password.</p>
      </div>
      <form className="space-y-4">
        <input name="email" type="email" placeholder="Email" required className="w-full p-2 border rounded-md" />
        <input name="password" type="password" placeholder="Password" required className="w-full p-2 border rounded-md" />
        
        {error && <FormFeedback message={error} type="error" />}
        {success && <FormFeedback message={success} type="success" />}
        
        <div className="flex gap-4">
          <Button type="submit" onClick={(e) => handleSubmit(e as any, signInWithPassword)} disabled={isPending}>
            {isPending ? 'Signing In...' : 'Sign In'}
          </Button>
          <Button type="submit" onClick={(e) => handleSubmit(e as any, signUpWithPassword)} disabled={isPending}>
            {isPending ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </div>
      </form>
    </div>
  );
}

// --- Mobile OTP Authentication Form ---

export function MobileOTPForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      const formData = new FormData(e.currentTarget);
      const result = await sendMobileOTP(formData);
      if (result.success) {
        setSuccess(result.message);
        setOtpSent(true);
      } else {
        setError(result.message);
      }
    });
  };

  const handleVerifyOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      const formData = new FormData(e.currentTarget);
      const result = await verifyMobileOTP(formData);
      if (result.success) {
        setSuccess(result.message);
      } else {
        setError(result.message);
      }
    });
  };

  return (
    <div className="space-y-6">
      {!otpSent ? (
        <form onSubmit={handleSendOTP} className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">Sign In with Mobile</h2>
            <p className="text-gray-600">We will send a one-time password to your phone.</p>
          </div>
          <input name="phone" type="tel" placeholder="10-digit mobile number" required className="w-full p-2 border rounded-md" />
          {error && <FormFeedback message={error} type="error" />}
          {success && <FormFeedback message={success} type="success" />}
          <Button type="submit" disabled={isPending}>{isPending ? 'Sending OTP...' : 'Send OTP'}</Button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOTP} className="space-y-4">
           <div>
            <h2 className="text-2xl font-semibold">Verify OTP</h2>
            <p className="text-gray-600">Enter the 6-digit code sent to your number.</p>
          </div>
          <input name="phone" type="hidden" value={(new FormData(document.querySelector('form')!)).get('phone') as string}/>
          <input name="token" type="text" placeholder="6-digit OTP" required className="w-full p-2 border rounded-md" />
          {error && <FormFeedback message={error} type="error" />}
          {success && <FormFeedback message={success} type="success" />}
          <Button type="submit" disabled={isPending}>{isPending ? 'Verifying...' : 'Verify & Sign In'}</Button>
        </form>
      )}
    </div>
  );
}
