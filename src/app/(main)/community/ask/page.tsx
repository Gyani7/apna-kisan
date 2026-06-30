import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { AskQuestionForm } from '@/components/community/AskQuestionForm';
import { UserRole } from '@/lib/types';

export default async function AskQuestionPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile) {
    return redirect('/login');
  }

  const canAsk = [
    UserRole.Farmer,
    UserRole.Expert,
    UserRole.Buyer
  ].includes(profile.role);

  if (!canAsk) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Permission Denied</h1>
        <p>You do not have permission to ask questions.</p>
      </div>
    );
  }

  const handleAskQuestion = async (formData: FormData) => {
    'use server';

    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const category = formData.get('category') as string;
    const tags = (formData.get('tags') as string).split(',');

    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase.from('posts').insert([
        {
          title,
          content,
          category,
          tags,
          user_id: user.id,
          post_type: 'question', // Add this line
        },
      ]);

      if (error) {
        console.error('Error inserting question:', error);
      } else {
        redirect('/community');
      }
    }
  };

  return <AskQuestionForm onSubmit={handleAskQuestion} />;
}
