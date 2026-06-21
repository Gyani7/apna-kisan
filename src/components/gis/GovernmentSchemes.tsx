import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const schemes = [
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

export function GovernmentSchemes() {
  return (
    <Card className="bg-gray-800 border-gray-700 text-white mt-4">
      <CardHeader>
        <CardTitle>Government Schemes Intelligence</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {schemes.map((scheme, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{scheme.scheme_name}</AccordionTrigger>
              <AccordionContent>
                <p>{scheme.description}</p>
                <div className="mt-4">
                  <h4 className="font-bold">Benefits:</h4>
                  <ul className="list-disc ml-4">
                    {scheme.benefits.map((benefit, i) => <li key={i}>{benefit}</li>)}
                  </ul>
                </div>
                <a href={scheme.application_link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline mt-4 inline-block">Apply Now</a>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
