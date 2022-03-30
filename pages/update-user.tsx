import { PropTypesWithRefresh } from "types/propTypes";
import { Layout } from "components/Layout";
import { LoginForm } from "components/auth/LoginForm";
import { UpdateUserForm } from "components/auth/UpdateUserForm";
import { useMeQuery } from "src/generated/graphql-hooks";
//import { useRouter} from "next/router";

const UpdateUser = (props: PropTypesWithRefresh) => {
  const me = useMeQuery(props.gqlClient);
  //const router = useRouter()

  // update with proper routing later
  if (!me.data) {
    return (
      <Layout>
        <h3>Login</h3>
        <LoginForm gqlClient={props.gqlClient} setToken={props.setToken} />
      </Layout>
    );
  }
  return (
    <Layout>
      <h3>Update User Account</h3>
      <UpdateUserForm gqlClient={props.gqlClient} user={me.data.me} />
    </Layout>
  );
};

export default UpdateUser;
