import { PropTypesWithRefresh } from "types/propTypes";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useRegisterMutation } from "src/generated/graphql-hooks";

export const RegisterForm = (props: PropTypesWithRefresh) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();

  const createUser = useRegisterMutation(props.gqlClient);

  const onSubmit = (data: any) =>
    createUser.mutate(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        gender: data.gender,
        birthday: data.birthday,
        height_in_inches: data.height_in_inches,
      },
      {
        onSuccess: () => {
          //props.setToken(response.createUser);
          queryClient.invalidateQueries(["Me"]);
        },
      }
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="register-name-input">name</label>
      <input id="register-name-input" {...register("name")} />

      <label htmlFor="register-email-input">email</label>
      <input id="register-email-input" {...register("email")} />

      <label htmlFor="register-password-input">password</label>
      <input id="register-password-input" {...register("password")} />

      <label htmlFor="birthday-input">birthday</label>
      <input id="birthday-input" type="date" {...register("birthday")} />

      <label htmlFor="register-gender-input">category</label>
      <select id="register-gender-input" {...register("gender")}>
        {["MALE", "FEMALE", "NB"].map((g) => (
          <option value={g} key={g + "select"}>
            {g === "NB" ? "NONBINARY" : g}
          </option>
        ))}
      </select>

      <label htmlFor="register-height-input">height in inches</label>
      <input
        id="register-height-input"
        type="number"
        {...register("height_in_inches", {
          valueAsNumber: true,
        })}
      />

      <input type="submit" value="Sign Up" />
    </form>
  );
};
