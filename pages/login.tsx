// import { useState } from "react";
// import { useLoginMutation } from "../src/generated/graphql-hooks";
import { PropTypesWithRefresh } from "types/propTypes";
import { Layout } from "components/Layout";
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
// const Login = (props: PropTypesWithRefresh) => {
//   const [token, setToken] = useState<string | null>("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");

//   const login = useLoginMutation(props.gqlClient);

//   const handleLogin = () => {
//     login.mutate(
//       { email: loginEmail, password: loginPassword },
//       {
//         onSuccess: (newData) => {
//           console.log(newData);
//           props.setToken(newData.login);
//           setToken(newData.login);
//         },
//       }
//     );
//   };

//   return (
//     <div>
//       <h1>Auth Testing</h1>
//       <p>Token: {token}</p>
//       <h3>Register</h3>
//       <label htmlFor="register-name">name</label>
//       <input
//         type="text"
//         id="register-name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <label htmlFor="register-email">email</label>
//       <input
//         type="text"
//         id="register-email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <label htmlFor="register-password">password</label>
//       <input
//         type="password"
//         id="register-password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={() => {}}>Register</button>
//       <h3>Login</h3>
//       <label htmlFor="register-login-email">login email</label>
//       <input
//         type="text"
//         id="register-login-email"
//         value={loginEmail}
//         onChange={(e) => setLoginEmail(e.target.value)}
//       />
//       <label htmlFor="register-login-password">login password</label>
//       <input
//         type="password"
//         id="register-login-password"
//         value={loginPassword}
//         onChange={(e) => setLoginPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>Login</button>
//       <button onClick={() => props.setToken("")}>Logout</button>
//     </div>
//   );
// };

export default Login;
