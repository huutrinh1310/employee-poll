import { ContentLayout } from "@/components/layout/ContentLayout";
import { Label } from "@/components/ui/label";
import { useQuestion } from "@/hooks/useQuestion";
import { Question } from "@/types/entities.type";
import QuestionList from "./components/QuestionList";

export default function HomePage() {
  const { questions } = useQuestion();
  const newQuestion = questions?.filter(
    (item: Question) =>
      !item.optionOne.votes.includes(item.author) &&
      !item.optionTwo.votes.includes(item.author)
  );
  const doneQuestion = questions?.filter(
    (item: Question) =>
      item.optionOne.votes.includes(item.author) ||
      item.optionTwo.votes.includes(item.author)
  );

  return (
    <ContentLayout title="Home">
      <div className="flex flex-col gap-5">
        <Label
          children={"New Question"}
          className="my-5 inline-block text-md font-bold"
        />
        {(newQuestion && newQuestion?.length > 0 && (
          <QuestionList data={newQuestion as Question[]} />
        )) || (
          <Label
            children="No new question"
            className="text-center"
          />
        )}
        <Label
          children={"Done"}
          className="my-5 inline-block text-md font-bold"
        />
        {(doneQuestion && doneQuestion.length > 0 && (
          <QuestionList data={doneQuestion as Question[]} />
        )) || (
          <Label
            children="No done question"
            className="text-center"
          />
        )}
      </div>
    </ContentLayout>
  );
}
