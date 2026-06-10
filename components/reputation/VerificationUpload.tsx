'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

type DocType = 'Aadhaar' | 'Farmer Card' | 'KCC Card';
type VerificationStatus = 'pending' | 'approved' | 'rejected' | 'none';

export default function FarmerVerificationUpload({ user }: { user: User }) {
  const [file, setFile] = useState<File | null>(null);
  const [docType, setDocType] = useState<DocType>('Aadhaar');
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<VerificationStatus>('none');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchVerificationStatus();
  }, [user]);

  const fetchVerificationStatus = async () => {
    const { data, error } = await supabase
      .from('verification_requests')
      .select('status')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (data) setStatus(data.status as VerificationStatus);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setMessage(null);

    try {
      // 1. Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      const filePath = `verification-docs/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('verifications')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Insert record into verification_requests
      const { error: dbError } = await supabase
        .from('verification_requests')
        .insert({
          user_id: user.id,
          document_type: docType,
          document_url: filePath,
          status: 'pending'
        });

      if (dbError) throw dbError;

      setStatus('pending');
      setMessage({ type: 'success', text: 'Documents uploaded successfully. Admin will review them shortly.' });
      setFile(null);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Upload failed. Please try again.' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-100 rounded-lg">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04m17.236 0a11.955 11.955 0 01-1.883 5.823 11.954 11.954 0 01-5.428 5.158m-6.753-10.981a11.954 11.954 0 00-1.883 5.823 11.954 11.954 0 005.428 5.158m0 0a11.95 11.95 0 01-3.512 3.476l-3.328 2.304a1 1 0 01-1.332-.21l-3.512-4.576" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-slate-900">Farmer Verification</h2>
      </div>

      {/* Status Tracker */}
      {status !== 'none' && (
        <div className={`mb-6 p-4 rounded-xl flex items-center justify-between ${
          status === 'pending' ? 'bg-amber-50 border border-amber-200' : 
          status === 'approved' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Current Status</p>
            <p className={`text-lg font-bold capitalize ${
              status === 'pending' ? 'text-amber-700' : 
              status === 'approved' ? 'text-green-700' : 'text-red-700'
            }`}>{status}</p>
          </div>
          {status === 'approved' && (
            <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">VERIFIED</span>
          )}
        </div>
      )}

      {status !== 'approved' && status !== 'pending' && (
        <form onSubmit={handleUpload} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Select Document Type</label>
            <div className="grid grid-cols-3 gap-3">
              {(['Aadhaar', 'Farmer Card', 'KCC Card'] as DocType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setDocType(type)}
                  className={`py-2 px-3 text-sm font-medium rounded-lg border transition-all ${
                    docType === type 
                    ? 'bg-green-600 border-green-600 text-white shadow-md' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-green-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Upload Document (Image or PDF)</label>
            <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-8 hover:border-green-400 transition-colors bg-slate-50 text-center">
              <input 
                type="file" 
                accept="image/*,.pdf" 
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={uploading}
              />
              <div className="space-y-2">
                <svg className="mx-auto h-10 w-10 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-slate-600 text-sm">
                  {file ? <span className="text-green-600 font-medium">{file.name}</span> : "Click to select or drag and drop"}
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!file || uploading}
            className={`w-full py-3 rounded-xl font-bold text-white transition-all ${
              !file || uploading ? 'bg-slate-300 cursor-not-allowed' : 'bg-slate-300 cursor-not-allowed'
            }`}
          >
            {uploading ? 'Processing Security Upload...' : 'Submit for Verification'}
          </button>
        </form>
      )}

      {message && (
        <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${
          message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      <p className="mt-6 text-xs text-slate-400 text-center">
        Your documents are encrypted and stored securely. They are only used for identity verification purposes in compliance with farming regulations.
      </p>
    </div>
  );
}