import { Question } from "@/types/entities.type";
import QuestionItem from "./QuestionItem";

export interface IQuestionListProps {
  data: Question[];
}

export default function QuestionList({ data }: IQuestionListProps) {
  return (
    <div className="flex gap-5 flex-wrap">
      {data?.map((item) => (
        <QuestionItem
          key={item.id}
          data={item}
        />
      ))}
    </div>
  );
}
