'use client';

import { useState, useEffect } from 'react';
import { createSupabaseClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { Check, ShieldCheck, Upload, FileText, Map, Award, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const supabase = createSupabaseClient();

type DocType = 'Aadhaar' | 'Land Records' | 'KCC Card' | 'Farmer ID';
type VerificationStatus = 'pending' | 'approved' | 'rejected' | 'none';

export default function FarmerVerificationUpload({ user }: { user: User }) {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [docType, setDocType] = useState<DocType>('Aadhaar');
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<VerificationStatus>('none');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchVerificationStatus();
  }, [user]);

  const fetchVerificationStatus = async () => {
    const { data } = await supabase
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
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      const filePath = `verification-docs/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('verifications')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

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
      setMessage({ type: 'success', text: 'Verification submitted successfully. Our team will review your application.' });
      setStep(3);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Submission failed. Please try again.' });
    } finally {
      setUploading(false);
    }
  };

  const steps = [
    { id: 1, name: 'Select Document', icon: FileText },
    { id: 2, name: 'Upload', icon: Upload },
    { id: 3, name: 'Review', icon: ShieldCheck },
  ];

  if (status === 'approved') {
    return (
      <div className="glass-card p-8 text-center space-y-4 max-w-xl mx-auto">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gold/20 blur-2xl rounded-full" />
          <Award className="w-20 h-20 text-gold relative z-10 mx-auto" />
        </div>
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-gold via-amber-400 to-gold bg-clip-text text-transparent">Verified Farmer</h2>
        <p className="text-slate-400">Your identity has been verified. You now have full access to premium features and the marketplace.</p>
        <div className="pt-4">
          <span className="px-6 py-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-full font-bold text-sm tracking-widest flex items-center justify-center gap-2 w-fit mx-auto">
            <Check className="w-4 h-4" /> VERIFIED BADGE ACTIVE
          </span>
        </div>
      </div>
    );
  }

  if (status === 'pending') {
    return (
      <div className="glass-card p-8 text-center space-y-4 max-w-xl mx-auto border-gold/30">
        <Loader2 className="w-16 h-16 text-gold animate-spin mx-auto" />
        <h2 className="text-2xl font-bold text-white">Verification Pending</h2>
        <p className="text-slate-400">Our experts are currently reviewing your documents. This usually takes 24-48 hours.</p>
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 mt-6">
          <p className="text-sm text-slate-300">You will be notified once the review is complete.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Get Verified</h2>
        <p className="text-slate-400">Join the elite community of verified Indian farmers</p>
      </div>

      {/* Stepper */}
      <nav aria-label="Progress" className="mb-8">
        <ol role="list" className="flex items-center justify-between">
          {steps.map((s, i) => (
            <li key={s.id} className="relative flex-1 flex items-center group">
              <div className="flex flex-col items-center flex-1">
                <span className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  step >= s.id ? 'border-gold bg-gold text-slate-900 shadow-[0_0_15px_rgba(255,215,0,0.4)]' : 'border-slate-700 bg-slate-800 text-slate-500'
                }`}>
                  <s.icon className="w-5 h-5" />
                </span>
                <span className={`mt-2 text-[10px] font-bold uppercase tracking-wider ${
                  step >= s.id ? 'text-gold' : 'text-slate-500'
                }`}>{s.name}</span>
              </div>
              {i !== steps.length - 1 && (
                <div className={`absolute left-[50%] top-5 w-full h-[2px] -z-10 transition-colors ${
                  step > s.id ? 'bg-gold' : 'bg-slate-700'
                }`} />
              )}
            </li>
          ))}
        </ol>
      </nav>

      <div className="glass-card p-8 border-gold/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <ShieldCheck className="w-6 h-6 text-gold/30" />
        </div>

        <form onSubmit={handleUpload} className="space-y-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-300 uppercase tracking-widest">Select Proof Type</label>
                  <div className="grid grid-cols-2 gap-4">
                    {(['Aadhaar', 'Land Records', 'KCC Card', 'Farmer ID'] as DocType[]).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setDocType(type)}
                        className={`p-4 text-left rounded-xl border transition-all flex flex-col gap-2 group ${
                          docType === type 
                          ? 'border-gold bg-gold/10 shadow-[0_0_15px_rgba(255,215,0,0.1)]' 
                          : 'border-slate-700 bg-slate-800/50 hover:border-slate-500'
                        }`}
                      >
                        {type === 'Land Records' ? <Map className={`w-5 h-5 ${docType === type ? 'text-gold' : 'text-slate-500'}`} /> : <FileText className={`w-5 h-5 ${docType === type ? 'text-gold' : 'text-slate-500'}`} />}
                        <span className={`text-sm font-bold ${docType === type ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'}`}>{type}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <button 
                  type="button" 
                  onClick={() => setStep(2)}
                  className="w-full py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold transition-all shadow-lg"
                >
                  Continue to Upload
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-300 uppercase tracking-widest">Upload {docType}</label>
                  <div className="relative border-2 border-dashed border-slate-700 rounded-2xl p-12 hover:border-gold/50 transition-all bg-slate-800/50 text-center group">
                    <input 
                      type="file" 
                      accept="image/*,.pdf" 
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      disabled={uploading}
                    />
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                        <Upload className="w-8 h-8 text-gold" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-white">
                          {file ? file.name : "Drop your file here"}
                        </p>
                        <p className="text-sm text-slate-400 mt-1">Supports PNG, JPG, PDF up to 5MB</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    type="button" 
                    onClick={() => setStep(1)}
                    className="py-4 bg-slate-800 border border-slate-700 text-slate-300 rounded-xl font-bold hover:bg-slate-700 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!file || uploading}
                    className="relative py-4 bg-gradient-to-r from-gold via-amber-400 to-gold text-slate-900 rounded-xl font-black text-lg shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer" />
                    <span className="flex items-center justify-center gap-2">
                      {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify Now"}
                    </span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {message && (
          <div className={`mt-6 p-4 rounded-xl text-sm font-bold flex items-center gap-3 border ${
            message.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}>
            <div className={`w-2 h-2 rounded-full ${message.type === 'success' ? 'bg-green-400' : 'bg-red-400'}`} />
            {message.text}
          </div>
        )}
      </div>

      <p className="text-[10px] text-slate-500 text-center uppercase tracking-widest px-8">
        Your documents are encrypted and stored in ultra-secure vaults. They are only used for government compliance and platform trust building.
      </p>
    </div>
  );
}
