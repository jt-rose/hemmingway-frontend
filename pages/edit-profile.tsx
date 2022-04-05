import { PropTypesWithRefresh } from "types/propTypes";
import { Layout } from "components/Layout";
import { LoginForm } from "components/auth/LoginForm";
import { UpdateUserForm } from "components/auth/UpdateUserForm";
import { useMeQuery } from "src/generated/graphql-hooks";
import { LoaderStack } from "components/Loader";

const UpdateUser = (props: PropTypesWithRefresh) => {
  const me = useMeQuery(props.gqlClient);

  if (me.isLoading) {
    return (
      <Layout gqlClient={props.gqlClient} setToken={props.setToken}>
        <LoaderStack />
      </Layout>
    );
  }

  if (!me.data?.me) {
    return (
      <>
        <h3 className="text-2xl text-center mb-6 mt-4">Login</h3>
        <LoginForm gqlClient={props.gqlClient} setToken={props.setToken} />
      </>
    );
  }
  return (
    <Layout gqlClient={props.gqlClient} setToken={props.setToken}>
      <h3 className="text-2xl text-center mb-6 mt-4">Update Profile</h3>
      <UpdateUserForm gqlClient={props.gqlClient} user={me.data.me} />
    </Layout>
  );
};

export default UpdateUser;
