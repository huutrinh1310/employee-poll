import { ContentLayout } from "@/components/layout/ContentLayout";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { useQuestion } from "@/hooks/useQuestion";
import { RootState } from "@/stores/store";
import { Question } from "@/types/entities.type";
import { FileX, ScrollText } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import QuestionList from "./components/QuestionList";
import { cn } from "@/lib/utils";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function HomePage() {
  const { questions } = useQuestion();
  const user = useSelector((state: RootState) => state.authen.user);
  const [isUnAnswered, setIsUnAnswered] = useState<boolean>(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get("answered") === "true") {
      setIsUnAnswered(false);
    } else {
      navigate("/", { replace: true });
      setIsUnAnswered(true);
    }
  }, []);

  const newQuestion = questions
    ?.filter(
      (item: Question) =>
        user &&
        !item.optionOne.votes.includes(user.id) &&
        user &&
        !item.optionTwo.votes.includes(user.id)
    )
    .sort((a, b) => b.timestamp - a.timestamp);

  const doneQuestion = questions
    ?.filter(
      (item: Question) =>
        (user && item.optionOne.votes.includes(user.id)) ||
        (user && item.optionTwo.votes.includes(user.id))
    )
    .sort((a, b) => b.timestamp - a.timestamp);

  return (
    <ContentLayout title="Home">
      <div className="flex flex-col gap-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="gap-2 w-fit"
            >
              {isUnAnswered ? (
                <ScrollText
                  className={cn(
                    "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all"
                  )}
                />
              ) : (
                <FileX
                  className={cn(
                    "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all"
                  )}
                />
              )}
              <span>{isUnAnswered ? "Not answer yet" : "Answered"}</span>
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setIsUnAnswered(true)}>
              Not answer yet
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsUnAnswered(false)}>
              Answered
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex flex-col gap-5">
          {isUnAnswered ? (
            <>
              {(newQuestion && newQuestion?.length > 0 && (
                <QuestionList data={newQuestion as Question[]} />
              )) || (
                <Label
                  children="No new question"
                  className="text-center"
                />
              )}
            </>
          ) : (
            <>
              {(doneQuestion && doneQuestion.length > 0 && (
                <QuestionList data={doneQuestion as Question[]} />
              )) || (
                <Label
                  children="No done question"
                  className="text-center"
                />
              )}
            </>
          )}
        </div>
      </div>
    </ContentLayout>
  );
}
