import { Input } from "@components/ui/Input";
import InputGroup from "@components/ui/InputGroup";
import { useSignUpMutation } from "@generated/graphql";
import { AuthLayout } from "@layouts/AuthLayout";

import { Button } from "ui";
import { showNotification } from "@mantine/notifications";
import Link from "next/link";
import { useRouter } from "next/router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export interface SignUpFormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const SignUp = () => {
  const router = useRouter();
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<SignUpFormValues>();

  const [{ fetching }, signUp] = useSignUpMutation();

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
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

      router.push("/auth/signin");
    }
  };

  return (
    <div className="flex flex-col place-items-center justify-center items-center h-screen">
      <Link
        passHref
        href="/"
        className="font-oldFenris uppercase text-5xl text-white dark:text-brandBlack"
      >
        The Inn
      </Link>
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

        <Button size="large" disabled={fetching} fullWidth type="submit">
          Create Account
        </Button>

        <p className=" text-white">
          Already have an account?{" "}
          <span className="underline">
            <Link href="/auth/signin">Sign In here</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

SignUp.layoutProps = {
  meta: {
    title: "The Inn - Sign In",
    sideImage:
      "https://res.cloudinary.com/film-it/image/upload/v1670367251/the-inn/sidebar-appstore-today.jpg",
  },
  Layout: AuthLayout,
};

export default SignUp;
