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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const newPollSchema = z.object({
  firstOptionText: z.string().min(2, {
    message: "First must be at least 2 characters.",
  }),
  secondOptionText: z.string().min(2, {
    message: "Second must be at least 2 characters.",
  }),
});

interface NewPollFormProps {
  onSubmit: (values: z.infer<typeof newPollSchema>) => void;
}

export default function NewPollForm({ onSubmit }: NewPollFormProps) {
  const form = useForm<z.infer<typeof newPollSchema>>({
    resolver: zodResolver(newPollSchema),
    defaultValues: {
      firstOptionText: "",
      secondOptionText: "",
    },
  });

  return (
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
                    id={"first-text"}
                    data-testid="first-text"
                    placeholder="Enter your first option"
                    {...field}
                  />
                </FormControl>
                <FormMessage
                  id="first-error"
                  data-testid="first-error"
                  defaultValue={""}
                />
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
                    id={"second-text"}
                    data-testid="second-text"
                    placeholder="Enter your second option"
                    {...field}
                  />
                </FormControl>
                <FormMessage
                  id="second-error"
                  data-testid="second-error"
                  defaultValue={""}
                />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          id="submit-button"
          data-testid="submit-button"
          disabled={
            form.getFieldState("firstOptionText").isValidating ||
            form.getFieldState("secondOptionText").isValidating
          }
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
