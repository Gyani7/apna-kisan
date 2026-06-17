'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { submitGuestQuestion } from '@/lib/actions/community';
import { CATEGORIES } from '@/lib/config';

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const initialState = { success: false, message: '', errors: {} };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-green-200 disabled:bg-gray-400 disabled:shadow-none overflow-hidden"
    >
      <span className={`flex items-center justify-center gap-2 ${pending ? 'opacity-0' : 'opacity-100'}`}>
        Post Question
        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
      </span>
      {pending && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
    </button>
  );
}

export default function GuestQuestionForm() {
  const [state, formAction] = useFormState(submitGuestQuestion, initialState);

  useEffect(() => {
    if (state.success) {
      // Reset form logic can be added here if needed
    }
  }, [state.success]);

  if (state.success) {
    return (
      <div className="p-8 bg-green-50 border border-green-200 rounded-2xl text-center shadow-sm animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-green-900 mb-2">Question Submitted!</h3>
        <p className="text-green-700 mb-6">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5 bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-lg max-w-2xl mx-auto">
      <div className="border-b border-gray-100 pb-4 mb-2">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-6 bg-green-600 rounded-full" />
          <h2 className="text-2xl font-bold text-gray-800">Ask the Community</h2>
        </div>
        <p className="text-sm text-gray-500 font-medium ml-4">Get answers from expert farmers. No login required.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700 ml-1">Full Name (Optional)</label>
          <input name="guest_name" type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white focus:border-transparent outline-none transition-all" placeholder="e.g. Ramesh Kumar" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700 ml-1">Mobile (Optional)</label>
          <input name="guest_mobile" type="tel" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white focus:border-transparent outline-none transition-all" placeholder="10 digit number" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700 ml-1">Category *</label>
          <select name="category" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white outline-none appearance-none transition-all">
            <option value="" disabled selected>Select a category</option>
            {CATEGORIES.map(c => <option key={c.slug} value={c.name}>{c.nameHi}</option>)}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-gray-700 ml-1">State *</label>
          <select name="state" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white outline-none appearance-none transition-all">
            <option value="" disabled selected>Select your state</option>
            {STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-gray-700 ml-1">Detailed Question *</label>
        <textarea name="question" required rows={5} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white outline-none transition-all resize-none" placeholder="Describe your issue in detail..."></textarea>
        {state.errors?.question && <p className="text-red-500 text-xs mt-1">{state.errors.question}</p>}
      </div>

      {!state.success && state.message && (
        <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm">
          {state.message}
        </div>
      )}

      <SubmitButton />

      <p className="text-center text-xs text-gray-400 mt-4">Submissions are reviewed by our team before publishing.</p>
    </form>
  );
}
