import { Input } from "@components/ui/Input";
import InputGroup from "@components/ui/InputGroup";
import { AuthLayout } from "@layouts/index";
import { Button, mediaString, Text } from "ui";
import { showNotification } from "@mantine/notifications";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import React from "react";
import { useMediaQuery } from "@hooks/useMediaQueries";

export interface SignInFormValues {
  usernameOrEmail: string;
  password: string;
}

const SignIn = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const { data: session } = useSession();

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<SignInFormValues>();

  const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
    try {
      const { usernameOrEmail, password } = data;
      setLoading(true);
      // For authenticating with next-auth
      const res = await signIn("credentials", {
        redirect: false,
        email: usernameOrEmail,
        password,
      });

      if (!res.error) {
        router.push("/");
      }
      if (res.error) {
        showNotification({
          title: `Only accepted adventures can enter`,
          message: `Reason for not accepted inn: ${res.error}`,
          color: "red",
        });
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const handleGoogleSign = async () => {
    const res = await signIn("google", {});

    console.log("res: ", res);
  };

  return (
    <div className="flex flex-col place-items-center justify-center items-center h-screen">
      <Link
        passHref
        href="/"
        className="font-oldFenris uppercase text-5xl text-brandBlack dark:text-white"
      >
        The Inn
      </Link>
      <form
        className="flex flex-col mt-8 space-y-6 w-100 max-w-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Text as="h2" size="2xl" className="text-brandBlack dark:text-white">
          Sign-In
        </Text>
        <Text as="h3" size="lg" className="text-brandBlack dark:text-white">
          Welcome back! Please enter your details below
        </Text>

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

        <Button
          className="font-bold"
          size="large"
          disabled={loading}
          fullWidth
          type="submit"
        >
          Sign-In
        </Button>

        <p className="text-brandBlack dark:text-white">
          Dont have an account?{" "}
          <span className="underline">
            <Link href="/auth/signup">Sign up here</Link>
          </span>
        </p>

        <button
          type="button"
          onClick={handleGoogleSign}
          className="flex gap-4 items-center justify-center p-4 bg-white w-full rounded-md font-bold"
        >
          <Image
            src="/images/Google_Logo.svg"
            width={24}
            height={24}
            alt="Google login button"
          />
          Google Login
        </button>
      </form>
    </div>
  );
};

SignIn.layoutProps = {
  meta: {
    title: "The Inn - Sign In",
    sideImage:
      "https://res.cloudinary.com/film-it/image/upload/v1670365199/the-inn/martin-sobr-matt-s-group.jpg",
  },
  Layout: AuthLayout,
};

export default SignIn;
