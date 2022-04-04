import { PropTypesWithRefresh } from "types/propTypes";
import { RegisterForm } from "components/auth/RegisterForm";
import Link from "next/link";

const Login = (props: PropTypesWithRefresh) => {
  return (
    <>
      <h3 className="text-2xl text-center mb-6 mt-4">Register</h3>
      <RegisterForm gqlClient={props.gqlClient} setToken={props.setToken} />
      <Link href="/login">
        <a>Login</a>
      </Link>
    </>
  );
};

export default Login;
