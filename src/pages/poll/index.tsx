import { ContentLayout } from "@/components/layout/ContentLayout";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useQuestion } from "@/hooks/useQuestion";
import { useUser } from "@/hooks/useUser";
import { RootState } from "@/stores/store";
import { User } from "@/types/entities.type";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function PollPage() {
  const { getUserById } = useUser();
  const navigate = useNavigate();
  const { saveQuestionAnswer, setCurrentQuestionService } = useQuestion();
  const user = useSelector((state: RootState) => state.authen.user);

  const currentQuestion = useSelector(
    (state: RootState) => state.question.currentQuestion
  );
  const { question_id } = useParams();
  const [author, setAuthor] = useState<User | null>(null);

  useEffect(() => {
    if (question_id) {
      setCurrentQuestionService(question_id).then((data) => {
        if (data) {
          getUserById(data.author).then((author) => {
            setAuthor(author);
          });
        } else {
          navigate("/not-found");
        }
      });
    }
  }, [question_id]);

  const handleAnswer = async (type: "optionOne" | "optionTwo") => {
    await saveQuestionAnswer({
      authedUser: user?.id as string,
      qid: currentQuestion?.id as string,
      answer: type,
    }).then((success) => {
      if (success) {
        navigate("/");
      }
    });
  };

  return (
    <ContentLayout title="Poll page">
      <div className="flex w-full container flex-col gap-5">
        <div className="container flex flex-col gap-5">
          <Label className="text-center font-bold text-3xl">
            Poll by {currentQuestion?.author}
          </Label>
          <Avatar className="w-1/2 h-1/2 mx-auto">
            <AvatarImage
              src={author?.avatarURL}
              alt="Avatar"
            />
          </Avatar>
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
              <Button
                className="w-full border-primary hover:bg-secondary hover:text-primary"
                variant={"default"}
                children={"Click"}
                onClick={() => {
                  handleAnswer("optionOne");
                }}
              />
            </CardContent>
          </Card>
          <Card className="w-full md:w-1/2">
            <CardHeader>
              <CardTitle>{currentQuestion?.optionTwo.text}</CardTitle>
            </CardHeader>
            <hr />
            <CardContent className="pt-3">
              <Button
                className="w-full border-primary hover:bg-secondary hover:text-primary"
                variant={"default"}
                children={"Click"}
                onClick={() => {
                  handleAnswer("optionTwo");
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </ContentLayout>
  );
}
