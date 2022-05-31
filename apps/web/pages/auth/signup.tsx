import { Input } from "@components/ui/Input";
import InputGroup from "@components/ui/InputGroup";
import { useSignUpMutation } from "@generated/graphql";
import { AuthLayout } from "@layouts/AuthLayout";

import { Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export interface SignUpFormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const SignUp = () => {
  const { data: session } = useSession();
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    watch,
  } = useForm<SignUpFormValues>();

  const [_, signUp] = useSignUpMutation();

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    console.log("data: ", data);
    const { email, password, firstName, lastName } = data;

    const res = await signUp({
      email,
      password,
      firstName,
      lastName,
    });

    if (res.error) {
      showNotification({
        title: "Account not created",
        message: `Submission error! ${res.error.message}`,
        color: "red",
      });
    }

    if (res.data) {
      showNotification({
        title: "Account created successfully",
        message: `Welcome to The Inn ${data.firstName} ${data.lastName}`,
        color: "green",
      });
    }
  };

  return (
    <div className="flex flex-col place-items-center justify-center items-center h-screen">
      <div className="font-oldFenris uppercase text-5xl text-white dark:text-brandBlack">
        The Inn
      </div>
      <form
        className="flex flex-col mt-8 space-y-6 max-w-xl"
        style={{ width: "600px" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>SignIn</h2>
        <InputGroup
          className="my-8"
          label="*Username or email"
          error={errors?.email}
        >
          <Controller
            control={control}
            name="email"
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
        <InputGroup
          className="my-8"
          label="*First Name"
          error={errors?.firstName}
        >
          <Controller
            control={control}
            name="firstName"
            render={({ field }) => (
              <Input
                placeholder="firstName"
                value={field.value}
                onChange={(e) => field.onChange(e)}
              />
            )}
          />
        </InputGroup>
        <InputGroup
          className="my-8"
          label="*Last Name"
          error={errors?.lastName}
        >
          <Controller
            control={control}
            name="lastName"
            render={({ field }) => (
              <Input
                placeholder="lastName"
                value={field.value}
                onChange={(e) => field.onChange(e)}
              />
            )}
          />
        </InputGroup>

        <Button type="submit">Create Account</Button>

        <p className="underline text-white">
          Already have an account? <Link href="/auth/signin">Sign In here</Link>
        </p>
      </form>
    </div>
  );
};

SignUp.layoutProps = {
  meta: {
    title: "The Inn - Sign In",
  },
  Layout: AuthLayout,
};

export default SignUp;
