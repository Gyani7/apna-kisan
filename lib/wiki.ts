import 'server-only';

const wikiPages = [
  {
    slug: 'wheat',
    title: 'Wheat',
    content: `
      <h2 class="text-2xl font-bold mb-4">About Wheat</h2>
      <p>Wheat is a cereal grain, which is a worldwide staple food. The many species of wheat together make up the genus Triticum; the most widely grown is common wheat (T. aestivum). The archaeological record suggests that wheat was first cultivated in the regions of the Fertile Crescent around 9600 BCE.</p>
      <h3 class="text-xl font-bold mt-6 mb-2">Major Diseases</h3>
      <ul>
        <li>Leaf Rust</li>
        <li>Powdery Mildew</li>
        <li>Stripe Rust</li>
      </ul>
      <h3 class="text-xl font-bold mt-6 mb-2">Recommended Fertilizers</h3>
      <ul>
        <li>Urea</li>
        <li>Di-Ammonium Phosphate (DAP)</li>
        <li>Muriate of Potash (MOP)</li>
      </ul>
    `,
  },
  // Add more wiki pages as needed
];

export async function getWikiPage(slug: string) {
  return wikiPages.find((page) => page.slug === slug);
}
