import { PropTypesWithRefresh } from "types/propTypes";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useLoginMutation } from "src/generated/graphql-hooks";

export const LoginForm = (props: PropTypesWithRefresh) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();

  const login = useLoginMutation(props.gqlClient);

  const onSubmit = (data: any) =>
    login.mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (response) => {
          props.setToken(response.login);
          queryClient.invalidateQueries(["Me"]);
        },
      }
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="login-email-input">email</label>
      <input id="login-email-input" {...register("email")} />

      <label htmlFor="login-password-input">password</label>
      <input id="login-password-input" {...register("password")} />
      <input type="submit" value="Login" />
    </form>
  );
};
