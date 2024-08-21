import { ContentLayout } from "@/components/layout/ContentLayout";
import { Label } from "@/components/ui/label";
import { useQuestion } from "@/hooks/useQuestion";
import { Question } from "@/types/entities.type";
import QuestionList from "./components/QuestionList";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

export default function HomePage() {
  const { questions } = useQuestion();
  const user = useSelector((state: RootState) => state.authen.user);
  const newQuestion = questions?.filter(
    (item: Question) =>
      user &&
      !item.optionOne.votes.includes(user.id) &&
      user &&
      !item.optionTwo.votes.includes(user.id)
  );

  const doneQuestion = questions?.filter(
    (item: Question) =>
      (user && item.optionOne.votes.includes(user.id)) ||
      (user && item.optionTwo.votes.includes(user.id))
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
