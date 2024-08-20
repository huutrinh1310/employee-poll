import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Question } from "@/types/entities.type";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export interface IQuestionItemProps {
  data?: Question;
}

export default function QuestionItem({ data }: IQuestionItemProps) {
  const navigate = useNavigate();
  return (
    <Card className="w-full md:w-[400px] lg:w-[300px]">
      <CardHeader>
        <CardTitle>{data?.author}</CardTitle>
        <CardDescription>
          {dayjs(data?.timestamp).format("hh:mm A | DD/MM/YYYY")}
        </CardDescription>
      </CardHeader>
      <hr />
      <CardContent className="pt-3">
        <Button
          className="w-full border-primary"
          variant={"outline"}
          children={"Show"}
          onClick={() => {
            navigate("/questions/" + data?.id);
          }}
        />
      </CardContent>
    </Card>
  );
}
