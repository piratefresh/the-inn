import { Input } from "@components/ui/Input";
import { Button } from "@mantine/core";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

export interface SignInFormValues {
  email: string;
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

  const onSubmit = async (data) => {
    const { username, password } = data;
    await signIn("Credentials", {
      username,
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
        <Input placeholder="Your email" />
        <Input placeholder="password" />

        <Button type="submit">Sign-In</Button>
      </form>
    </div>
  );
};

export default SignIn;
