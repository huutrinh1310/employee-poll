import { ContentLayout } from "@/components/layout/ContentLayout";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useQuestion } from "@/hooks/useQuestion";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { setQuestions } from "@/stores/features/question/questionSlice";
import { RootState } from "@/stores/store";
import { Question, User } from "@/types/entities.type";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function PollPage() {
  const { getUserById } = useUser();
  const navigate = useNavigate();
  const {
    questions,
    saveQuestionAnswer,
    setCurrentQuestionService,
    getAllQuestions,
  } = useQuestion();
  const user = useSelector((state: RootState) => state.authen.user);
  const currentQuestion = useSelector(
    (state: RootState) => state.question.currentQuestion
  );
  const { question_id } = useParams();
  const [author, setAuthor] = useState<User | null>(null);
  const [isAnswer, setIsAnswer] = useState<boolean>(false);
  const [progressOne, setProgressOne] = useState<number>(0);
  const [progressTwo, setProgressTwo] = useState<number>(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (question_id) {
      const fetchData = async () => {
        await setCurrentQuestionService(question_id).then((data) => {
          if (data as Question) {
            setIsAnswer(
              (data as Question).optionOne.votes.includes(user?.id as string) ||
                (data as Question).optionTwo.votes.includes(user?.id as string)
            );

            setProgressOne(
              Math.round(
                ((data as Question).optionOne.votes.length /
                  ((data as Question).optionOne.votes.length +
                    (data as Question).optionTwo.votes.length)) *
                  100
              )
            );
            setProgressTwo(
              Math.round(
                ((data as Question).optionTwo.votes.length /
                  ((data as Question).optionOne.votes.length +
                    (data as Question).optionTwo.votes.length)) *
                  100
              )
            );
          }

          if (data) {
            getUserById(data.author).then((author) => {
              setAuthor(author);
            });
          } else {
            navigate("/not-found", {
              replace: true,
              state: { message: "Question not found", path: "/not-found" },
            });
          }
        });
      };
      fetchData();
    }

    return () => {
      setAuthor(null);
    };
  }, [question_id, questions]);

  const handleAnswer = async (type: "optionOne" | "optionTwo") => {
    await saveQuestionAnswer({
      authedUser: user?.id as string,
      qid: currentQuestion?.id as string,
      answer: type,
    }).then(async () => {
      setIsAnswer(true);
      await getAllQuestions().then((data) => {
        dispatch(setQuestions(data));
        return data;
      });
    });
  };

  return (
    <ContentLayout title="Poll page">
      <div className="flex w-full container flex-col gap-5">
        <div className="container flex flex-col gap-5">
          <Label className="text-center font-bold text-3xl">
            Poll by{" "}
            {currentQuestion?.author === user?.id ? "You" : author?.name}
          </Label>
          <div className="w-full h-1/6 flex gap-10 justify-center">
            <Avatar
              className={cn(
                "w-1/2 h-1/2 box-border",
                currentQuestion?.author === user?.id &&
                  "border-primary border-[5px]"
              )}
            >
              <AvatarImage
                src={author?.avatarURL}
                alt="Avatar"
              />
            </Avatar>
          </div>
        </div>
        <Label className="text-center font-bold text-3xl">
          Would You Rather
        </Label>
        <div className="flex w-full gap-5">
          <Card className="w-full md:w-1/2">
            <CardHeader>
              <CardTitle>{currentQuestion?.optionOne.text}</CardTitle>
            </CardHeader>
            <hr />
            <CardContent className="pt-3">
              {isAnswer ? (
                <div className="flex gap-3 items-center justify-center">
                  <Progress
                    value={progressOne}
                    className="w-full h-[20px]"
                  />
                  <Label className="text-primary">{progressOne}%</Label>
                  <Label className="text-primary ">
                    {currentQuestion?.optionOne.votes.length}&nbsp;
                    {(currentQuestion?.optionOne.votes.length as number) > 1
                      ? "votes"
                      : "vote"}
                  </Label>
                </div>
              ) : (
                <Button
                  className="w-full border-primary hover:bg-secondary hover:text-primary"
                  variant={"default"}
                  children={"Click"}
                  onClick={() => {
                    handleAnswer("optionOne");
                  }}
                />
              )}
            </CardContent>
          </Card>
          <Card className="w-full md:w-1/2">
            <CardHeader>
              <CardTitle>{currentQuestion?.optionTwo.text}</CardTitle>
            </CardHeader>
            <hr />
            <CardContent className="pt-3">
              {isAnswer ? (
                <div className="flex gap-3 items-center justify-center">
                  <Progress
                    value={progressTwo}
                    className="w-full h-[20px]"
                  />
                  <Label className="text-primary">{progressTwo}%</Label>
                  <Label className="text-primary ">
                    {currentQuestion?.optionTwo.votes.length}&nbsp;
                    {(currentQuestion?.optionTwo.votes.length as number) > 1
                      ? "votes"
                      : "vote"}
                  </Label>
                </div>
              ) : (
                <Button
                  className="w-full border-primary hover:bg-secondary hover:text-primary"
                  variant={"default"}
                  children={"Click"}
                  onClick={() => {
                    handleAnswer("optionTwo");
                  }}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ContentLayout>
  );
}
