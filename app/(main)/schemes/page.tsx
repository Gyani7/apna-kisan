'use client';

import { SchemeCard } from "@/components/schemes/SchemeCard";

const schemes = [
  {
    id: 1,
    name: 'Pradhan Mantri Fasal Bima Yojana',
    description: 'A crop insurance scheme to protect against crop failure.',
  },
  {
    id: 2,
    name: 'Kisan Credit Card',
    description: 'A credit scheme for farmers to meet their cultivation needs.',
  },
  {
    id: 3,
    name: 'Pradhan Mantri Kisan Samman Nidhi',
    description: 'A scheme that provides income support to all landholding farmer families.',
  },
  {
    id: 4,
    name: 'Soil Health Card Scheme',
    description: 'A scheme to help farmers improve soil health and productivity.',
  },
];

export default function SchemesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Government Schemes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {schemes.map((scheme) => (
          <SchemeCard key={scheme.id} scheme={scheme} />
        ))}
      </div>
    </div>
  );
}
