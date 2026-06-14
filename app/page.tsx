import { getQuestions } from '@/lib/actions/question';
import Question from '@/components/Question';

export default async function Home() {
  const questions = await getQuestions();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold mb-8">All Questions</h1>
        <div className="space-y-4">
          {questions.map((question: any) => (
            <Question key={question.id} question={question} />
          ))}
        </div>
      </div>
    </main>
  );
}
