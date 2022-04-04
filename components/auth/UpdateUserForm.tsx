import { PropTypesWithUser } from "types/propTypes";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useUpdateUserMutation } from "src/generated/graphql-hooks";
import { Form } from "components/forms/Form";
import { Input } from "components/forms/Input";
import { useRouter } from "next/router";
import { Radio } from "components/forms/Radio";

export const UpdateUserForm = (props: PropTypesWithUser) => {
  const { name, email, gender, birthday, height_in_inches } = props.user;
  const initialFormValues = { name, email, gender, birthday, height_in_inches };
  const queryClient = useQueryClient();
  const router = useRouter();
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
        onSuccess: () => {
          queryClient.invalidateQueries(["Me"]);
          router.push("/");
        },
      }
    );

  return (
    <Form submitButtonName="Update" onSubmit={handleSubmit(onSubmit)}>
      <Input
        required
        type="text"
        id="update-name-input"
        label="Name"
        placeholder="..."
        formConnect={register("name")}
      />

      <Input
        required
        type="text"
        id="update-email-input"
        label="Email"
        placeholder="..."
        formConnect={register("email")}
      />

      <Input
        required
        type="date"
        id="update-birthday-input"
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
        />
      </div>

      <Input
        required
        type="number"
        id="update-height-input"
        label="Height in Inches"
        placeholder="..."
        formConnect={register("height_in_inches", {
          valueAsNumber: true,
        })}
      />
    </Form>
  );
};
