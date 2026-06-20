import 'server-only';

const qas = [
  {
    slug: 'what-is-the-best-fertilizer-for-wheat',
    question: 'What is the best fertilizer for wheat?',
    author: { name: 'Ramesh Patel', avatar: '/avatars/ramesh.png' },
    askedOn: '2024-07-28',
    answers: [
      {
        id: '1',
        text: 'A combination of Urea and DAP in a 2:1 ratio is generally recommended for wheat.',
        author: { name: 'Dr. Anil Sharma', avatar: '/avatars/anil.png' },
        answeredOn: '2024-07-28',
      },
      {
        id: '2',
        text: 'I have had good results with using vermicompost as well. It improves soil health in the long run.',
        author: { name: 'Sunita Devi', avatar: '/avatars/sunita.png' },
        answeredOn: '2024-07-29',
      },
    ],
  },
  // Add more questions as needed
];

export async function getQuestionBySlug(slug: string) {
  return qas.find((qa) => qa.slug === slug);
}

export async function getAllQuestions() {
  return qas;
}
