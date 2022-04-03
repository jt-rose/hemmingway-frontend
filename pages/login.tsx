import { PropTypesWithRefresh } from "types/propTypes";
import { LoginForm } from "components/auth/LoginForm";
import Link from "next/link";

const Login = (props: PropTypesWithRefresh) => {
  return (
    <>
      <h3>Login</h3>

      <LoginForm gqlClient={props.gqlClient} setToken={props.setToken} />
      <Link href="/register">
        <a>Register</a>
      </Link>
    </>
  );
};

export default Login;
