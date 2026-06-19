'use client';

import * as React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Spinner } from '@/components/icons';
import { Shell } from '@/components/shell';

const otpSchema = z.object({
  otp: z.string().min(6, { message: 'OTP must be 6 digits' }),
});

type FormData = z.infer<typeof otpSchema>;

export default function OtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get('phone');
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(otpSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const signInResult = await signIn('credentials', {
      phone,
      otp: data.otp,
      redirect: false,
      callbackUrl: '/dashboard',
    });

    setIsLoading(false);

    if (!signInResult?.ok) {
      return toast({
        title: 'Something went wrong.',
        description: 'Your sign in request failed. Please try again.',
        variant: 'destructive',
      });
    }

    router.push('/dashboard');
  }

  return (
    <Shell>
      <div className="grid gap-6">
        <h1 className="text-2xl font-semibold">Enter OTP</h1>
        <p className="text-muted-foreground">
          We've sent a One-Time Password to your mobile number.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="otp">
                OTP
              </Label>
              <Input
                id="otp"
                placeholder="Enter your OTP"
                type="text"
                autoCapitalize="none"
                autoComplete="one-time-code"
                autoCorrect="off"
                disabled={isLoading}
                {...register('otp')}
              />
              {errors?.otp && (
                <p className="px-1 text-xs text-red-600">
                  {errors.otp.message}
                </p>
              )}
            </div>
            <button className={cn(buttonVariants())} disabled={isLoading}>
              {isLoading && (
                <Spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Verify OTP
            </button>
          </div>
        </form>
      </div>
    </Shell>
  );
}
