import { ContentLayout } from "@/components/layout/ContentLayout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUser } from "@/hooks/useUser";
import { _saveQuestion } from "@/lib/_DATA";
import { RootState } from "@/stores/store";
import { Question } from "@/types/entities.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  firstOptionText: z.string().min(2, {
    message: "First must be at least 2 characters.",
  }),
  secondOptionText: z.string().min(2, {
    message: "Second must be at least 2 characters.",
  }),
});

export default function NewPage() {
  const user = useSelector((state: RootState) => state.authen.user);
  const navigate = useNavigate();
  const { updateUsers } = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstOptionText: "",
      secondOptionText: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await _saveQuestion({
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
        <Form {...form}>
          <form
            className="w-full grid gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="firstOptionText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Option</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your first option"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="secondOptionText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Second Option</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your second option"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              disabled={
                form.getFieldState("firstOptionText").isValidating ||
                form.getFieldState("secondOptionText").isValidating
              }
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </ContentLayout>
  );
}
