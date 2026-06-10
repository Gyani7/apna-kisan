'use client';

import { useEffect, useState, useTransition } from 'react';
import { matchUserToSchemes } from '@/lib/actions/scheme-matcher';
import { Check, ArrowRight } from 'lucide-react';

interface SchemeMatch {
  match_score: number;
  is_eligible: boolean;
  government_schemes: {
    id: string;
    scheme_name: string;
    description: string;
    benefits: string[];
    application_link: string;
    eligibility_criteria: any;
  };
}

function SchemeCard({ match }: { match: SchemeMatch }) {
  const { government_schemes: scheme, is_eligible, match_score } = match;
  const matchPercentage = Math.round(match_score * 100);

  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
      <div className={`p-4 ${is_eligible ? 'bg-green-50' : 'bg-yellow-50'}`}>
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">{scheme.scheme_name}</h3>
          <span 
            className={`px-3 py-1 text-sm font-semibold rounded-full ${is_eligible ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
            {is_eligible ? 'Eligible' : 'Potentially Eligible'}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-2">{scheme.description}</p>
      </div>
      
      <div className="p-4">
        <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-2">Key Benefits</h4>
            <ul className="space-y-2">
                {scheme.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                        <Check size={16} className="text-green-500"/> {benefit}
                    </li>
                ))}
            </ul>
        </div>

        <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-1">Match Score</h4>
            <div className="flex items-center gap-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: `${matchPercentage}%`}}></div>
                </div>
                <span className="font-bold text-blue-600">{matchPercentage}%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Based on your profile information.</p>
        </div>
        
        <a 
          href={scheme.application_link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
        >
          Apply Now <ArrowRight size={18} className="ml-2"/>
        </a>
      </div>
    </div>
  );
}

export default function SchemesPage() {
  const [isPending, startTransition] = useTransition();
  const [matches, setMatches] = useState<SchemeMatch[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startTransition(async () => {
      const result = await matchUserToSchemes();
      if (result.success) {
        setMatches(result.matches || []);
      } else {
        setError(result.message || 'An unknown error occurred.');
      }
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="border-b pb-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Your Matched Schemes</h1>
            <p className="text-md text-gray-600 mt-1">We've matched you with government schemes based on your profile.</p>
        </div>

        {isPending ? (
          <div className="text-center py-10">
            <p>Finding the best schemes for you...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10 bg-red-50 text-red-700 rounded-lg">
            <p>Error: {error}</p>
          </div>
        ) : matches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matches.map(match => (
                    <SchemeCard key={match.government_schemes.id} match={match} />
                ))}
            </div>
        ) : (
          <div className="text-center py-10">
            <p>No schemes matched your profile at this time.</p>
          </div>
        )}
    </div>
  );
}
