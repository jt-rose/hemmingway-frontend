import { PropTypesWithRefresh } from "types/propTypes";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useRegisterMutation } from "src/generated/graphql-hooks";
import { Form } from "components/forms/Form";
import { Input } from "components/forms/Input";
import { Select } from "components/forms/Select";
import { useRouter } from "next/router";

export const RegisterForm = (props: PropTypesWithRefresh) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();
  const router = useRouter();

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
          props.setToken("");
          queryClient.invalidateQueries(["Me"]);
          router.push("/login");
        },
      }
    );

  return (
    <Form submitButtonName="Sign up" onSubmit={handleSubmit(onSubmit)}>
      {/* <label htmlFor="register-name-input">name</label>
      <input id="register-name-input" {...register("name")} /> */}

      <Input
        required
        type="text"
        id="register-name-input"
        label="Name"
        placeholder="..."
        formConnect={register("name")}
      />

      <Input
        required
        type="text"
        id="register-email-input"
        label="Email"
        placeholder="..."
        formConnect={register("email")}
      />
      {/* <label htmlFor="register-email-input">email</label>
      <input id="register-email-input" {...register("email")} /> */}

      {/* <label htmlFor="register-password-input">password</label>
      <input id="register-password-input" {...register("password")} /> */}

      <Input
        required
        type="password"
        id="register-password-input"
        label="Password"
        placeholder="********"
        formConnect={register("password")}
      />

      {/* <label htmlFor="birthday-input">birthday</label>
      <input id="birthday-input" type="date" {...register("birthday")} /> */}

      <Input
        required
        type="date"
        id="birthday-input"
        label="Birthday"
        placeholder="..."
        formConnect={register("birthday")}
      />

      {/* <label htmlFor="register-gender-input">category</label>
      <select id="register-gender-input" {...register("gender")}>
        {["MALE", "FEMALE", "NB"].map((g) => (
          <option value={g} key={g + "select"}>
            {g === "NB" ? "NONBINARY" : g}
          </option>
        ))}
      </select> */}

      <Select
        id="register-gender-input"
        selectOptions={["MALE", "FEMALE", "NB"]}
        formConnect={register("gender")}
        label="Gender"
      />

      {/* <label htmlFor="register-height-input">height in inches</label>
      <input
        id="register-height-input"
        type="number"
        {...register("height_in_inches", {
          valueAsNumber: true,
        })}
      /> */}

      <Input
        required
        type="number"
        id="register-height-input"
        label="Height in Inches"
        placeholder="..."
        formConnect={register("height_in_inches", {
          valueAsNumber: true,
        })}
      />
    </Form>
  );
};
