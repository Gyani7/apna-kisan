
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "./icons";
import { User } from "next-auth";

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, "id" | "name">;
}

export function UserNameForm({
  user,
  className,
  ...props
}: UserNameFormProps) {
  const router = useRouter();
  const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<{
    name: string;
  }>();

  async function onSubmit(data: { name: string }) {
    const response = await fetch(`/api/users/${user.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
        }),
      }
    );

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your name was not updated. Please try again.",
        variant: "destructive",
      });
    }

    toast({
      description: "Your name has been updated.",
    });

    router.refresh();
  }

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>Your Name</CardTitle>
          <CardDescription>
            Please enter your full name or a display name you are comfortable
            with.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              className="w-[400px]"
              size={32}
              defaultValue={user.name ?? ""}
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="px-1 text-xs text-red-600">
                This field is required.
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={isSubmitting}>
            {isSubmitting && (
              <Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save Changes</span>
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
