import { ContentLayout } from "@/components/layout/ContentLayout";
import { Label } from "@/components/ui/label";
import { Question } from "@/types/entities.type";
import QuestionList from "./components/QuestionList";
import { useQuestion } from "@/hooks/userQuestion";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useEffect } from "react";

export default function HomePage() {
  const { fetchQuestion } = useQuestion();
  const { newQuestion, doneQuestion } = useSelector(
    (state: RootState) => state.question
  );

  useEffect(() => {
    fetchQuestion();
  }, []);

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
