import { ContentLayout } from "@/components/layout/ContentLayout";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useUser } from "@/hooks/useUser";
import { _saveQuestionAnswer } from "@/lib/_DATA";
import { setCurrentQuestion } from "@/stores/features/question/questionSlice";
import { RootState } from "@/stores/store";
import { User } from "@/types/entities.type";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function PollPage() {
  const dispatch = useDispatch();
  const { getUserById } = useUser();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.authen.user);

  const currentQuestion = useSelector(
    (state: RootState) => state.question.currentQuestion
  );
  const { id } = useParams();
  const [author, setAuthor] = useState<User | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(setCurrentQuestion(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    const fetchQuestion = async () =>
      getUserById(currentQuestion?.author as string).then((data) =>
        setAuthor(data)
      );

    fetchQuestion();

    return () => {
      setAuthor(null);
    };
  }, [currentQuestion, getUserById]);

  const handleAnswer = async (type: "optionOne" | "optionTwo") => {
    await _saveQuestionAnswer({
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
