import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "@/hooks/useUser";
import { setLogin } from "@/stores/features/auth/authSlice";
import { RootState } from "@/stores/store";
import { User } from "@/types/entities.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function LoginPage() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state: RootState) => state.authen.isAuth);
  const { login, usersList } = useUser();
  const navigate = useNavigate();
  const { state } = useLocation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  useEffect(() => {
    if (isAuth) {
      toast({
        variant: "default",
        title: "Success!",
        description: "Login successfully!",
      }).update({
        id: "login-success",
        duration: 5000,
      });
      navigate(state?.path || "/");
    }
  }, [isAuth]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await login(values);
    if (result) {
      dispatch(setLogin(result as User));
    } else {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Username or password is incorrect!",
      }).update({
        id: "login-error",
      });
    }
  }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] h-[100vh]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-muted-foreground truncate">
              Enter your username below to login to your account
            </p>
          </div>
          <Form {...form}>
            <form
              className="grid gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {usersList?.map((item) => (
                            <SelectItem
                              key={item.id}
                              value={item.id}
                            >
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password"></Label>
                  <Link
                    to="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full"
              >
                Login
              </Button>
              <Button
                variant="outline"
                className="w-full"
              >
                Login with Google
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              to="#"
              className="underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
