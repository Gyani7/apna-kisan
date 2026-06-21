'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

export default function AICropDoctorPage() {
  const [image, setImage] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleDiagnose = async () => {
    if (!image) return;
    setLoading(true);
    // Mock diagnosis for now
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setDiagnosis({
      disease: 'Late Blight',
      pest: 'Aphids',
      deficiency: 'Nitrogen',
      treatment: 'Apply a fungicide containing mancozeb. Introduce ladybugs to control aphids. Use a nitrogen-rich fertilizer.',
      nearbyShops: [
        { id: '1', name: 'Agri Inputs Store', distance: '2.5 km' },
        { id: '2', name: 'Kisan Kendra', distance: '5 km' },
      ],
      videos: [
        { id: '1', title: 'How to control Late Blight', url: 'https://youtube.com/watch?v=xxxx' },
        { id: '2', title: 'Organic pest control for aphids', url: 'https://youtube.com/watch?v=yyyy' },
      ],
      expertAnswers: [
        { id: '1', question: 'What is the best time to spray for Late Blight?', answer: 'Early morning or late evening.', expert: 'Dr. Anil Sharma' },
      ],
    });
    setLoading(false);
  };

  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <h1 className='text-3xl font-bold mb-8'>AI Crop Doctor</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Upload Crop Image</CardTitle>
            </CardHeader>
            <CardContent>
              <Input type='file' accept='image/*' onChange={handleImageUpload} />
              {image && <img src={image} alt='Crop' className='mt-4 rounded-lg' />}
              <Button onClick={handleDiagnose} disabled={!image || loading} className='mt-4'>
                {loading ? 'Diagnosing...' : 'Diagnose'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {loading && (
          <div className='flex items-center justify-center'>
            <Progress value={50} />
          </div>
        )}

        {diagnosis && (
          <Card>
            <CardHeader>
              <CardTitle>Diagnosis & Treatment</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Disease:</strong> {diagnosis.disease}</p>
              <p><strong>Pest:</strong> {diagnosis.pest}</p>
              <p><strong>Deficiency:</strong> {diagnosis.deficiency}</p>
              <p className='mt-4'><strong>Treatment:</strong> {diagnosis.treatment}</p>

              <div className='mt-8'>
                <h3 className='text-lg font-bold'>Nearby Shops</h3>
                <ul>
                  {diagnosis.nearbyShops.map((shop: any) => (
                    <li key={shop.id}>{shop.name} ({shop.distance})</li>
                  ))}
                </ul>
              </div>

              <div className='mt-8'>
                <h3 className='text-lg font-bold'>Helpful Videos</h3>
                <ul>
                  {diagnosis.videos.map((video: any) => (
                    <li key={video.id}>
                      <a href={video.url} target='_blank' rel='noreferrer' className='text-blue-500 hover:underline'>
                        {video.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className='mt-8'>
                <h3 className='text-lg font-bold'>Expert Answers</h3>
                <ul>
                  {diagnosis.expertAnswers.map((qa: any) => (
                    <li key={qa.id}>
                      <p><strong>Q:</strong> {qa.question}</p>
                      <p><strong>A:</strong> {qa.answer} - <em>{qa.expert}</em></p>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
