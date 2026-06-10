// app/admin/community-questions/page.tsx
import { createClient } from '@/lib/supabase/server';
import QuestionActionButtons from '@/components/admin/QuestionActionButtons';

export const dynamic = 'force-dynamic';

export default async function AdminCommunityQuestions() {
  const supabase = await createClient();

  const { data: questions, error } = await supabase
    .from('community_questions')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  if (error) {
    return <div className="p-6 text-red-500">Error loading questions: {error.message}</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Pending Community Questions</h1>
        <p className="text-slate-500">Review and approve questions from guest users.</p>
      </div>

      <div className="grid gap-6">
        {questions?.length === 0 ? (
          <div className="bg-white p-12 rounded-xl border border-dashed border-slate-300 text-center text-slate-500">
            No pending questions found.
          </div>
        ) : (
          questions?.map((q) => (
            <div key={q.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full uppercase">
                      {q.category}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full uppercase">
                      {q.state}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{q.question}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <span className="font-medium text-slate-700">By:</span> {q.name}
                    </span>
                    {q.mobile && (
                      <span className="flex items-center gap-1">
                        <span className="font-medium text-slate-700">Mob:</span> {q.mobile}
                      </span>
                    )}
                    <span>{new Date(q.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <QuestionActionButtons questionId={q.id} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// components/admin/QuestionActionButtons.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function QuestionActionButtons({ questionId }: { questionId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleApprove = async () => {
    if (!confirm('Approve this question for the public hub?')) return;
    setLoading(true);
    
    // Status update triggers the DB function to move this to the 'questions' table
    const { error } = await supabase
      .from('community_questions')
      .update({ status: 'approved' })
      .eq('id', questionId);

    if (error) {
      alert(error.message);
    } else {
      router.refresh();
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this submission?')) return;
    setLoading(true);

    const { error } = await supabase
      .from('community_questions')
      .delete()
      .eq('id', questionId);

    if (error) {
      alert(error.message);
    } else {
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleApprove}
        disabled={loading}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
      >
        Approve
      </button>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="px-4 py-2 bg-white border border-red-200 hover:bg-red-50 text-red-600 text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
}