import { Input } from "@components/ui/Input";
import InputGroup from "@components/ui/InputGroup";
import { AuthLayout } from "@layouts/AuthLayout";
import { Button, Text } from "ui";
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
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<SignInFormValues>();

  const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
    const { usernameOrEmail, password } = data;

    // For authenticating with next-auth
    const res = await signIn("credentials", {
      redirect: false,
      email: usernameOrEmail,
      password,
    });

    if (!res.error) {
      console.log("session: ", session);
      const name = `${session?.user.name}`;
      showNotification({
        title: `Welcome back ${name}`,
        message: "Enjoy your stay",
      });
      router.push("/");
    }
    if (res.error) {
      showNotification({
        title: `Only accepted adventures can enter`,
        message: `Reason for not accepted inn: ${res.error}`,
        color: "red",
      });
    }
  };

  return (
    <div className="flex flex-col place-items-center justify-center items-center h-screen">
      <Link href="/">
        <a className="font-oldFenris uppercase text-5xl text-brandBlack dark:text-white">
          The Inn
        </a>
      </Link>
      <form
        className="flex flex-col mt-8 space-y-6 w-100 max-w-xl"
        style={{ width: "600px" }}
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

        <Button size="large" fullWidth type="submit">
          Sign-In
        </Button>

        <p className="text-brandBlack dark:text-white">
          Dont have an account?{" "}
          <span className="underline">
            <Link href="/auth/signup">Sign up here</Link>
          </span>
        </p>
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
