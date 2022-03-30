import { PropTypesWithUser } from "types/propTypes";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useUpdateUserMutation } from "src/generated/graphql-hooks";

export const UpdateUserForm = (props: PropTypesWithUser) => {
  const { name, email, gender, birthday, height_in_inches } = props.user;
  const initialFormValues = { name, email, gender, birthday, height_in_inches };
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm({
    defaultValues: initialFormValues,
  });

  const updateUser = useUpdateUserMutation(props.gqlClient);

  const onSubmit = (data: any) =>
    updateUser.mutate(
      {
        name: data.name,
        email: data.email,
        gender: data.gender,
        birthday: data.birthday,
        height_in_inches: data.height_in_inches,
      },
      {
        onSuccess: (data) => {
          //props.setToken(response.createUser);
          console.log(data);
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

      <input type="submit" value="Update User Account" />
    </form>
  );
};
