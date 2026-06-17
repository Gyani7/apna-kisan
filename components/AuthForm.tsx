'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SupabaseClient } from '@supabase/supabase-js';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.enum(['farmer', 'buyer'])
});

type FormData = z.infer<typeof userAuthSchema>;

export function AuthForm() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
    defaultValues: {
      email: '',
      password: '',
      role: 'farmer',
    }
  });
  
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGitHubLoading, setIsGitHubLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setSupabase(createBrowserClient());
  }, []);

  const handleLogin = async (data: FormData) => {
    if (!supabase) return;
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    
    setIsLoading(false);

    if (error) {
      return toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    }
    
    router.push('/');
    router.refresh();
  };

  const handleSignUp = async (data: FormData) => {
    if (!supabase) return;
    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
        data: {
          role: data.role,
        },
      },
    });
    
    setIsLoading(false);
    
    if (error) {
      return toast({
        title: "Sign Up Failed",
        description: error.message,
        variant: "destructive",
      });
    }

    return toast({
      title: "Check your email",
      description: "We've sent you a confirmation link to complete your registration.",
    });
  };
  
  const handleGithubSignIn = async () => {
    if (!supabase) return;
    setIsGitHubLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className={cn("grid gap-6")}>
      <form>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGitHubLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              disabled={isLoading || isGitHubLoading}
              {...register("password")}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">{errors.password.message}</p>
            )}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="role">Role</Label>
            <Select onValueChange={(value) => setValue('role', value as 'farmer' | 'buyer')} defaultValue="farmer">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="farmer">Farmer</SelectItem>
                <SelectItem value="buyer">Buyer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex space-x-2">
             <Button onClick={handleSubmit(handleLogin)} disabled={isLoading || isGitHubLoading} className="w-full">
              Login
            </Button>
            <Button onClick={handleSubmit(handleSignUp)} disabled={isLoading || isGitHubLoading} variant="secondary" className="w-full">
              Sign Up
            </Button>
          </div>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        onClick={handleGithubSignIn}
        disabled={isLoading || isGitHubLoading}
      >
        GitHub
      </Button>
    </div>
  );
}
