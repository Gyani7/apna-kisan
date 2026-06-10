'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function QuestionActionButtons({ questionId }: { questionId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
