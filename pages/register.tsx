import { PropTypesWithRefresh } from "types/propTypes";
import { RegisterForm } from "components/auth/RegisterForm";
import Link from "next/link";

const Login = (props: PropTypesWithRefresh) => {
  return (
    <>
      <h3 className="text-2xl text-center mb-6 mt-4">Register</h3>

      <RegisterForm gqlClient={props.gqlClient} setToken={props.setToken} />
      <p className="text-center mt-12 mb-8">Already have an account?</p>
      <Link href="/login">
        <div className="flex justify-center mt-8">
          <a className="text-white font-bold hover:cursor-pointer bg-teal-400 hover:bg-teal-500 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">
            Login
          </a>
        </div>
      </Link>
    </>
  );
};

export default Login;
