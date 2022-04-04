import { PropTypesWithRefresh } from "types/propTypes";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import {
  useLoginMutation,
  useRegisterMutation,
} from "src/generated/graphql-hooks";
import { Form } from "components/forms/Form";
import { Input } from "components/forms/Input";
import { Radio } from "components/forms/Radio";
import { useRouter } from "next/router";

export const RegisterForm = (props: PropTypesWithRefresh) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const createUser = useRegisterMutation(props.gqlClient);
  const loginUser = useLoginMutation(props.gqlClient);

  const onSubmit = (data: any) => {
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
        // upon success, log user in and redirect them
        // to fill out data on current weight for BMR calculations
        onSuccess: () => {
          loginUser.mutate(
            { email: data.email, password: data.password },
            {
              onSuccess: (res) => {
                queryClient.invalidateQueries(["Me"]);
                props.setToken(res.login);
                router.push("/settings");
              },
            }
          );
        },
      }
    );
  };

  return (
    <Form submitButtonName="Sign up" onSubmit={handleSubmit(onSubmit)}>
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

      <Input
        required
        type="password"
        id="register-password-input"
        label="Password"
        placeholder="********"
        formConnect={register("password")}
      />

      <Input
        required
        type="date"
        id="birthday-input"
        label="Birthday"
        placeholder="..."
        formConnect={register("birthday")}
      />

      <div>
        <Radio
          formConnect={register("gender")}
          radioOptions={[
            { displayName: "MALE", value: "MALE" },
            { displayName: "FEMALE", value: "FEMALE" },
            { displayName: "ENBY", value: "NB" },
          ]}
          name="gender"
          formtype="register"
        />
      </div>

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
