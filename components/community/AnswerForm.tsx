'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createAnswer } from '@/lib/actions/answers';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';

const answerSchema = z.object({
  content: z.string().min(10, "Answer must be at least 10 characters"),
});

export function AnswerForm({ questionId }: { questionId: number }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof answerSchema>>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      content: '',
    },
  });

  function onSubmit(values: z.infer<typeof answerSchema>) {
    startTransition(async () => {
        const result = await createAnswer(questionId, values.content);
        if(result.success) {
            form.reset();
            // This is a simple way to refresh the data
            router.refresh(); 
        } else {
            // Handle error state, e.g., show a toast notification
            console.error(result.message)
        }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Answer</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share your knowledge and help out!"
                  rows={6}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Post Answer'}
        </Button>
      </form>
    </Form>
  );
}
