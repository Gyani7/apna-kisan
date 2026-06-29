
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { createSupabaseClient } from '@/lib/supabase/client';
import { getUser } from '@/lib/user';
import withAuthorization from '@/components/withAuthorization';
import { UserRole } from '@/lib/types';

function AskQuestionPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createSupabaseClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const user = await getUser();
    if (!user) {
      toast({ title: 'Please log in to ask a question.', variant: 'destructive' });
      setIsSubmitting(false);
      return;
    }

    const { error } = await supabase.from('questions').insert({
      author_id: user.id,
      title,
      content,
    });

    if (error) {
      console.error('Error creating question:', error);
      toast({ title: 'Error creating question', variant: 'destructive' });
    } else {
      toast({ title: 'Question posted successfully!' });
      router.push('/community');
    }

    setIsSubmitting(false);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Ask a Question</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title">Question Title</label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <label htmlFor="content">Details</label>
            <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Posting...' : 'Post Question'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default withAuthorization(AskQuestionPage, [UserRole.FARMER, UserRole.EXPERT, UserRole.BUYER]);
