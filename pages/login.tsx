import { PropTypesWithRefresh } from "types/propTypes";
import { LoginForm } from "components/auth/LoginForm";
import Link from "next/link";

const Login = (props: PropTypesWithRefresh) => {
  return (
    <>
      <h3 className="text-2xl text-center mb-6 mt-4">Login</h3>

      <p className="text-center">
        Welcome to the Hemmingway app, where you can
      </p>
      <ul className="text-center my-8">
        <li>√ track your fitness and health</li>
        <li>√ get daily recommendations</li>
        <li>√ visualize your progess over time</li>
      </ul>

      <p className="text-center mb-8">
        Log in to your account and begin creating a better life, right now
      </p>
      <LoginForm gqlClient={props.gqlClient} setToken={props.setToken} />
      <p className="text-center mt-12">
        Not a member? Please take a moment to sign up!
      </p>
      <Link href="/register">
        <div className="flex justify-center mt-8">
          <a className="text-white font-bold hover:cursor-pointer bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            Register
          </a>
        </div>
      </Link>
    </>
  );
};

export default Login;
