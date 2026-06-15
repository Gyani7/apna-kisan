'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

// Define the shape of a community question
interface CommunityQuestion {
  id: string;
  created_at: string;
  category: string;
  question: string;
  name: string;
  state: string;
}

// Define the shape of the statistics object
interface AdminStats {
  totalUsers: number;
  pendingQuestions: number;
  pendingVerifications: number;
  recentQuestions: CommunityQuestion[];
  platformGrowth: {
    userEngagementIncrease: number;
    storageUsedPercentage: number;
  };
}

/**
 * Fetches administration statistics from the database.
 * @returns An object containing various statistics.
 */
export async function getStats(): Promise<AdminStats> {
    const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const [
    { count: totalUsers },
    { count: pendingQuestions },
    { count: pendingVerifications },
    { data: recentQuestionsData },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('community_questions').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('verification_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('community_questions').select('*').order('created_at', { ascending: false }).limit(5),
  ]);

  const recentQuestions: CommunityQuestion[] = recentQuestionsData || [];

  // Simulated data for platform growth and system health
  const platformGrowth = {
    userEngagementIncrease: 12, // Example static value
    storageUsedPercentage: 70, // Example static value
  };

  return {
    totalUsers: totalUsers || 0,
    pendingQuestions: pendingQuestions || 0,
    pendingVerifications: pendingVerifications || 0,
    recentQuestions,
    platformGrowth,
  };
}

// --- Mock Embedding Service ---
// In a real application, this would be a call to an embedding model like OpenAI's text-embedding-ada-002.
async function getMockEmbedding(text: string): Promise<number[]> {
  console.log(`Generating mock embedding for: "${text.substring(0, 50)}..."`);
  // Create a deterministic, high-dimensional vector from the text.
  const vector = Array(1536).fill(0);
  for (let i = 0; i < text.length; i++) {
    vector[i % 1536] += text.charCodeAt(i);
  }
  // Normalize the vector to ensure consistency in similarity calculations
  const norm = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  if (norm === 0) {
    return vector; // Avoid division by zero for empty or all-zero vectors
  }
  return vector.map(v => v / norm);
}

// Define the shape of a government scheme for seeding
interface SchemeToSeed {
  scheme_name: string;
  description: string;
  eligibility_criteria: Record<string, any>;
  benefits: string[];
  application_link: string;
}

/**
 * Seeds the government_schemes table with initial data and generates embeddings.
 * This is an admin action to populate or update the schemes for the recommendation engine.
 * NOTE: This function assumes that the 'government_schemes' table has an 'embedding' column of type vector(1536).
 */
export async function seedAndEmbedSchemes(): Promise<{ message: string; error?: string }> {
    const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const schemes: SchemeToSeed[] = [
    {
      scheme_name: 'PM Kisan Samman Nidhi',
      description: 'A central sector scheme with 100% funding from the Government of India. It provides income support of ₹6,000 per year to all landholding farmer families.',
      eligibility_criteria: { land_holding_max_acres: 5, farmer_type: 'small_marginal', required_docs: ['Aadhaar', 'Land Record'] },
      benefits: ['₹6,000 per year in three installments', 'Direct bank transfer'],
      application_link: 'https://pmkisan.gov.in/'
    },
    {
      scheme_name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      description: 'An insurance service for farmers for their yields. It provides a comprehensive insurance cover against failure of the crop thus helping in stabilising the income of the farmers.',
      eligibility_criteria: { is_loanee_farmer: true, has_crop_insurance: false, required_docs: ['Aadhaar', 'Land Record', 'Bank Passbook'] },
      benefits: ['Insurance coverage for crop loss', 'Financial stability'],
      application_link: 'https://pmfby.gov.in/'
    },
    {
      scheme_name: 'Kisan Credit Card (KCC)',
      description: 'A scheme that provides farmers with timely access to credit. It provides a revolving cash credit facility.',
      eligibility_criteria: { min_age: 18, max_age: 75, is_farmer: true, required_docs: ['Aadhaar', 'Voter ID', 'Land Record'] },
      benefits: ['Revolving credit up to ₹3 lakh', 'Low interest rates'],
      application_link: 'https://www.sbi.co.in/web/agri-rural/agriculture-banking/crop-finance/kisan-credit-card'
    }
  ];

  try {
    console.log('Starting to seed and embed government schemes...');

    for (const scheme of schemes) {
      // 1. Create a rich text content to generate a more effective embedding.
      const textToEmbed = `Scheme: ${scheme.scheme_name}. Description: ${scheme.description}. Eligibility: ${JSON.stringify(scheme.eligibility_criteria)}`;

      // 2. Generate the vector embedding from the text.
      const embedding = await getMockEmbedding(textToEmbed);

      // 3. Upsert the scheme data along with its embedding into the database.
      const { error } = await supabase
        .from('government_schemes')
        .upsert({
          scheme_name: scheme.scheme_name,
          description: scheme.description,
          eligibility_criteria: scheme.eligibility_criteria,
          benefits: scheme.benefits,
          application_link: scheme.application_link,
          embedding: embedding,
        }, { onConflict: 'scheme_name' }); // Use scheme_name as the unique identifier to avoid duplicates.

      if (error) {
        throw new Error(`Failed to upsert scheme "${scheme.scheme_name}": ${error.message}`);
      }
      console.log(`Successfully seeded and embedded scheme: "${scheme.scheme_name}"`);
    }

    return { message: `${schemes.length} schemes have been successfully seeded and embedded.` };

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
    console.error("Error during scheme seeding:", errorMessage);
    return { message: 'Failed to seed schemes.', error: errorMessage };
  }
}
