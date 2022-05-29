import { Input } from "@components/ui/Input";
import { Button } from "@mantine/core";
import { signIn, useSession } from "next-auth/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export interface SignInFormValues {
  usernameOrEmail: string;
  password: string;
}

const SignIn = () => {
  const { data: session } = useSession();
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    watch,
  } = useForm<SignInFormValues>();

  const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
    console.log("data: ", data);
    const { usernameOrEmail, password } = data;

    await signIn("credentials", {
      email: usernameOrEmail,
      password,
    });
  };

  console.log("session: ", session);

  return (
    <div>
      <form
        className="mt-8 space-y-6 bg-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>SignIn</h2>
        <Controller
          control={control}
          name="usernameOrEmail"
          render={({ field }) => (
            <Input
              placeholder="Your email"
              value={field.value}
              onChange={(e) => field.onChange(e)}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input
              placeholder="password"
              value={field.value}
              onChange={(e) => field.onChange(e)}
            />
          )}
        />

        <Button type="submit">Sign-In</Button>
      </form>
    </div>
  );
};

export default SignIn;
