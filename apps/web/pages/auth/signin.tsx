import { Input } from "@components/ui/Input";
import InputGroup from "@components/ui/InputGroup";
import { AuthLayout } from "@layouts/AuthLayout";

import { Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export interface SignInFormValues {
  usernameOrEmail: string;
  password: string;
}

const SignIn = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    watch,
  } = useForm<SignInFormValues>();

  const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
    const { usernameOrEmail, password } = data;

    const res = await signIn("credentials", {
      redirect: false,
      email: usernameOrEmail,
      password,
    });
    console.log("res: ", res);
    if (!res?.error) {
      const name = `${session?.user.name}`;
      showNotification({
        title: `Welcome back ${name}`,
        message: "Enjoy your stay",
      });
      router.push("/");
    }
    if (res?.error) {
      showNotification({
        title: `Only accepted adventures can enter`,
        message: `Reason for not accepted inn: ${res.error}`,
        color: "red",
      });
    }
  };

  return (
    <div className="flex flex-col place-items-center justify-center items-center h-screen">
      <div className="font-oldFenris uppercase text-5xl text-white dark:text-brandBlack">
        The Inn
      </div>
      <form
        className="flex flex-col mt-8 space-y-6 w-100 max-w-xl"
        style={{ width: "600px" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>SignIn</h2>
        <InputGroup
          className="my-8"
          label="*Username or email"
          error={errors?.usernameOrEmail}
        >
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
        </InputGroup>

        <InputGroup className="my-8" label="*Password" error={errors?.password}>
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
        </InputGroup>

        <Button type="submit">Sign-In</Button>

        <p className="underline text-white">
          Dont have an account? <Link href="/auth/signup">Sign up here</Link>
        </p>
      </form>
    </div>
  );
};

SignIn.layoutProps = {
  meta: {
    title: "The Inn - Sign In",
  },
  Layout: AuthLayout,
};

export default SignIn;
