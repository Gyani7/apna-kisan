'use server';

import { z } from 'zod';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// --- TYPE DEFINITIONS ---

/**
 * The result from the AI analysis service.
 */
interface AIAnalysisResult {
  detected_disease: string;
  confidence_score: number;
  recommendations: string[];
}

/**
 * The structure of the analysis result stored in the database and returned to the client.
 */
interface AnalysisRecord {
  id: string;
  user_id: string;
  image_url: string;
  status: 'pending' | 'completed' | 'failed';
  analysis_provider: string | null;
  analysis_payload: AIAnalysisResult | null;
  detected_disease: string | null;
  confidence_score: number | null;
  recommendations: string[] | null;
  created_at: string;
}


/**
 * State object for the crop analysis form action.
 */
interface AnalysisFormState {
  success: boolean;
  message: string;
  analysisResult?: AnalysisRecord; // Use a strong type
  errors?: {
    image?: string[];
    _form?: string[];
  };
}

// --- ZOD SCHEMA FOR INPUT VALIDATION ---
const ImageAnalysisSchema = z.object({
  image: z.instanceof(File).refine(file => file.size > 0, 'An image file is required.')
    .refine(file => file.size < 4 * 1024 * 1024, `Image must be less than 4MB.`)
    .refine(file => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), 'Only .jpg, .png, and .webp formats are supported.'),
});

// --- SIMULATED AI ANALYSIS SERVICE ---
async function getMockAIAnalysis(imageUrl: string): Promise<AIAnalysisResult> {
  console.log(`Simulating AI analysis for image: ${imageUrl}`);
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Mock responses based on some deterministic factor from the URL
  if (imageUrl.includes('healthy')) {
    return {
      detected_disease: 'No Disease Detected',
      confidence_score: 0.98,
      recommendations: ['Maintain current watering schedule', 'Monitor for pests'],
    };
  }
  
  return {
    detected_disease: 'Late Blight',
    confidence_score: 0.92,
    recommendations: [
      'Apply a certified fungicide immediately.',
      'Remove and destroy infected plant parts.',
      'Improve air circulation around plants.',
      'Rotate crops in the next planting season.'
    ],
  };
}


// --- SERVER ACTION ---

/**
 * Analyzes a crop image by uploading it, calling a mock AI service, and storing the results.
 * @param prevState The previous state of the form action.
 * @param formData The form data containing the image to analyze.
 * @returns An updated AnalysisFormState with the result of the operation.
 */
export async function analyzeCropImage(prevState: AnalysisFormState, formData: FormData): Promise<AnalysisFormState> {
    const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  // 1. Authenticate user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, message: 'Authentication Error: Please log in to use this feature.' };
  }

  // 2. Validate input
  const validation = ImageAnalysisSchema.safeParse({ image: formData.get('image') });
  if (!validation.success) {
    return {
      success: false,
      message: 'Invalid image file.',
      errors: validation.error.flatten().fieldErrors,
    };
  }
  const { image } = validation.data;
  const filePath = `${user.id}/${Date.now()}-${image.name}`;

  // 3. Upload image to storage
  const { error: uploadError } = await supabase.storage
    .from('crop_images')
    .upload(filePath, image);

  if (uploadError) {
    console.error('Storage Upload Error:', uploadError);
    return { success: false, message: 'An error occurred while uploading the image. Please try again.' };
  }

  const { data: { publicUrl } } = supabase.storage.from('crop_images').getPublicUrl(filePath);

  // 4. Create initial analysis record in database
  const { data: analysisRecord, error: insertError } = await supabase
    .from('crop_health_analysis')
    .insert({ user_id: user.id, image_url: publicUrl, status: 'pending' })
    .select().single();

  if (insertError) {
    console.error('DB Insert Error:', insertError);
    return { success: false, message: 'An error occurred while preparing the analysis. Please try again.' };
  }

  // 5. Perform analysis (and update record)
  try {
    const analysisResult = await getMockAIAnalysis(publicUrl);

    const { data: updatedRecord, error: updateError } = await supabase
      .from('crop_health_analysis')
      .update({
        status: 'completed',
        analysis_provider: 'openai_mock',
        analysis_payload: analysisResult, // Storing the full payload
        detected_disease: analysisResult.detected_disease,
        confidence_score: analysisResult.confidence_score,
        recommendations: analysisResult.recommendations,
      })
      .eq('id', analysisRecord.id)
      .select()
      .single();

    if (updateError) {
        throw updateError;
    }

    revalidatePath('/dashboard/crop-analysis');
    return {
      success: true,
      message: 'Analysis complete.',
      analysisResult: updatedRecord as AnalysisRecord,
    };

  } catch (e: any) {
    console.error('Analysis or DB Update Error:', e);
    // Attempt to mark the. record as failed
    await supabase.from('crop_health_analysis').update({ status: 'failed' }).eq('id', analysisRecord.id);
    
    return { 
        success: false, 
        message: 'A critical error occurred during image analysis. The team has been notified.',
        errors: { _form: ['Analysis failed. Please try again later.'] }
    };
  }
}
