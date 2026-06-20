import { notFound } from "next/navigation";
import { getQuestionBySlug } from "@/lib/qa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function QuestionPage({ params }: { params: { slug: string } }) {
  const qa = await getQuestionBySlug(params.slug);

  if (!qa) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{qa.question}</CardTitle>
          <div className="flex items-center space-x-4 mt-4">
            <Avatar>
              <AvatarImage src={qa.author.avatar} />
              <AvatarFallback>{qa.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold">{qa.author.name}</p>
              <p className="text-sm text-gray-500">Asked on {qa.askedOn}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Answers</h2>
          {qa.answers.map((answer) => (
            <div key={answer.id} className="mb-6">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={answer.author.avatar} />
                  <AvatarFallback>{answer.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold">{answer.author.name}</p>
                  <p className="text-sm text-gray-500">Answered on {answer.answeredOn}</p>
                </div>
              </div>
              <p className="mt-4">{answer.text}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
