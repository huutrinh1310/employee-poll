import { ContentLayout } from "@/components/layout/ContentLayout";

import NewPollForm, { newPollSchema } from "./components/NewPollForm";
import { Question } from "@/types/entities.type";
import { z } from "zod";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { useQuestion } from "@/hooks/useQuestion";
import { RootState } from "@/stores/store";

export default function NewPage() {
  const user = useSelector((state: RootState) => state.authen.user);
  const navigate = useNavigate();
  const { updateUsers } = useUser();
  const { saveQuestion } = useQuestion();

  async function onSubmit(values: z.infer<typeof newPollSchema>) {
    await saveQuestion({
      id: "new question",
      author: user?.id as string,
      timestamp: Date.now(),
      optionOneText: values.firstOptionText,
      optionTwoText: values.secondOptionText,
    }).then((data: Question) => {
      if (data) {
        updateUsers(user?.id as string, data.id).then(() => {
          navigate("/");
        });
      }
    });
  }
  return (
    <ContentLayout title="New Page">
      <div className="flex flex-col items-center justify-center py-12 gap-5 px-10 max-w-[500px] mx-auto my-auto max-h-[100vh]">
        <div className="w-full grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Would You Rather</h1>
          <p className="text-muted-foreground truncate">Create You Own Poll</p>
        </div>
        <NewPollForm onSubmit={onSubmit} />
      </div>
    </ContentLayout>
  );
}
