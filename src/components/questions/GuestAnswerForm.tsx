'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { submitGuestAnswer } from '@/lib/actions/community';

const initialState = { success: false, message: '', errors: {} };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:bg-gray-400"
    >
      {pending ? 'Submitting...' : 'Post Answer'}
    </button>
  );
}

export default function GuestAnswerForm({ questionId }: { questionId: string }) {
  const [state, formAction] = useFormState(submitGuestAnswer, initialState);

  if (state.success) {
    return (
      <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-center">
        <h3 className="font-bold text-green-800">Answer Submitted!</h3>
        <p className="text-sm text-green-700">Thank you for your contribution. Your answer will be visible after admin approval.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="p-5 bg-white border rounded-lg shadow-sm">
      <h3 className="font-bold text-lg mb-3">Contribute as a Guest</h3>
      <input type="hidden" name="question_id" value={questionId} />
      
      <div className="space-y-4">
        <textarea
          name="content"
          required
          rows={4}
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          placeholder="Share your knowledge. Write a detailed answer..."
        />
        {state.errors?.content && <p className="text-red-500 text-xs">{state.errors.content}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input name="guest_name" type="text" className="w-full p-2 bg-gray-50 border rounded-md" placeholder="Name (Optional)" />
          <input name="guest_mobile" type="tel" className="w-full p-2 bg-gray-50 border rounded-md" placeholder="Mobile (Optional)" />
        </div>

        {!state.success && state.message && <p className="text-red-500 text-sm">{state.message}</p>}

        <div className="flex justify-end">
          <SubmitButton />
        </div>
      </div>
    </form>
  );
}
