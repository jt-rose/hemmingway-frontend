import { PropTypesWithRefresh } from "types/propTypes";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useLoginMutation } from "src/generated/graphql-hooks";
import { Input } from "components/forms/Input";
import { Form } from "components/forms/Form";
import { useRouter } from "next/router";
import { useState } from "react";

export const LoginForm = (props: PropTypesWithRefresh) => {
  const [loginError, setLoginError] = useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const login = useLoginMutation(props.gqlClient);

  const onSubmit = (data: any) =>
    login.mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (response) => {
          console.log(response.login);
          setLoginError(false);
          props.setToken(response.login);
          queryClient.invalidateQueries(["Me"]);
          router.push("/home");
        },
        onError: () => {
          props.setToken("");
          setLoginError(true);
        },
      }
    );

  return (
    <>
      {loginError && (
        <p className="text-red-700 mb-6 text-center">
          No such user found with that email / password combination
        </p>
      )}
      <Form submitButtonName="Login" onSubmit={handleSubmit(onSubmit)}>
        <Input
          required
          type="text"
          id="login-email-input"
          label="Email"
          placeholder="..."
          formConnect={register("email")}
        />
        <Input
          required
          type="password"
          id="login-password-input"
          label="Password"
          placeholder="*********"
          formConnect={register("password")}
        />
      </Form>
    </>
  );
};
