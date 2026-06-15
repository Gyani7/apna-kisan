'use client';

import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { analyzeCropImage } from '@/lib/actions/crop-analysis';
import { createBrowserClient } from '@/lib/supabase/client';
import type { CropHealthAnalysis } from '@/lib/types';
import { UploadCloud, CheckCircle, AlertTriangle, BarChart2, Zap } from 'lucide-react';

const initialState = { success: false, message: '', errors: {}, analysisResult: null };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending} 
      className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400"
    >
      {pending ? 'Analyzing...' : 'Analyze Crop Image'}
    </button>
  );
}

function AnalysisResultCard({ result }: { result: any }) {
    const confidencePercentage = (result.confidence_score * 100).toFixed(1);
    const isConfident = result.confidence_score > 0.85;

    return (
        <div className="bg-white shadow-lg rounded-2xl p-6 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="font-bold text-2xl text-gray-800 mb-4">Analysis Complete</h3>
            
            <div className="mb-5">
                <label className="font-semibold text-gray-500 text-sm">Detected Issue</label>
                <p className={`text-xl font-bold ${result.detected_disease === 'No Disease Detected' ? 'text-green-600' : 'text-orange-600'}`}>
                    {result.detected_disease}
                </p>
            </div>

            <div className="mb-6">
                <label className="font-semibold text-gray-500 text-sm">Confidence Score</label>
                <div className="flex items-center gap-3 mt-1">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                            className={`h-2.5 rounded-full ${isConfident ? 'bg-green-500' : 'bg-yellow-500'}`}
                            style={{ width: `${confidencePercentage}%` }}
                        ></div>
                    </div>
                    <span className={`font-bold text-lg ${isConfident ? 'text-green-600' : 'text-yellow-600'}`}>{confidencePercentage}%</span>
                </div>
            </div>

            <div>
                <label className="font-semibold text-gray-500 text-sm flex items-center gap-2 mb-2"><Zap size={16}/> Recommendations</label>
                <ul className="space-y-3">
                    {result.recommendations.map((rec: string, index: number) => (
                        <li key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-green-800 font-medium">{rec}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default function CropAnalysisPage() {
  const [state, formAction] = useFormState(analyzeCropImage, initialState);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [history, setHistory] = useState<CropHealthAnalysis[]>([]);
  const supabase = createBrowserClient();

  useEffect(() => {
    async function fetchHistory() {
        const { data: { user } } = await supabase.auth.getUser();
        if(user) {
            const { data, error } = await supabase
                .from('crop_health_analysis')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(5);
            if (data) setHistory(data as any);
        }
    }
    fetchHistory();
  }, [state.success, supabase.auth]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="border-b pb-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Crop Disease Detection</h1>
            <p className="text-md text-gray-600 mt-1">Upload an image of your crop to get an AI-powered health analysis.</p>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Form Side */}
            <div className="bg-white p-6 rounded-xl shadow-md border">
                <form action={formAction}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-2">Crop Image</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    {previewUrl ? (
                                        <img src={previewUrl} alt="Preview" className="mx-auto h-40 w-auto rounded-md" />
                                    ) : (
                                        <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                                    )}
                                    <div className="flex text-sm text-gray-600">
                                        <label htmlFor="image-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none">
                                            <span>Upload a file</span>
                                            <input id="image-upload" name="image" type="file" className="sr-only" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} required />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 4MB</p>
                                </div>
                            </div>
                            {state.errors?.image && <p className="text-red-500 text-xs mt-1">{state.errors.image[0]}</p>}
                        </div>
                        
                        {!state.success && state.message && (
                            <div className="flex items-center gap-3 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                                <AlertTriangle size={20} /> {state.message}
                            </div>
                        )}

                        <SubmitButton />
                    </div>
                </form>
            </div>

            {/* Result / Placeholder Side */}
            <div>
                {state.analysisResult ? (
                    <AnalysisResultCard result={state.analysisResult} />
                ) : (
                    <div className="text-center p-10 border-2 border-dashed rounded-xl h-full flex flex-col justify-center items-center">
                        <BarChart2 className="h-16 w-16 text-gray-300"/>
                        <h3 className="mt-2 text-lg font-medium text-gray-800">Analysis Results</h3>
                        <p className="mt-1 text-sm text-gray-500">Your crop analysis report will appear here.</p>
                    </div>
                )}
            </div>
        </div>

        {/* Analysis History */}
        <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Recent Analyses</h2>
            <div className="space-y-4">
                {history.length > 0 ? (
                    history.map(item => (
                        <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <img src={item.image_url} alt="Crop" className="w-16 h-16 rounded-md object-cover"/>
                                <div>
                                    <p className={`font-semibold ${item.detected_disease === 'No Disease Detected' ? 'text-gray-800' : 'text-orange-600'}`}>{item.detected_disease}</p>
                                    <p className="text-sm text-gray-500">{new Date(item.created_at).toLocaleString()}</p>
                                </div>
                            </div>
                            <span className="text-sm font-medium text-gray-600">{item.status}</span>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">You have no analysis history yet.</p>
                )}
            </div>
        </div>
    </div>
  );
}
