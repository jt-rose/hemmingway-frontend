import { useState, useEffect } from "react";
import axios from "axios";

const Auth = () => {
  const [token, setToken] = useState<string | null>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  useEffect(() => {
    axios
      .post("https://hemmingway.herokuapp.com/graphql", {
        query: `{ users(first: 3) { 
          data {
            name
          id
          email
          }
        }
      }`,
      })
      .then((response) => console.log(response));
  }, []);

  const login = () => {
    axios
      .post("https://hemmingway.herokuapp.com/graphql", {
        query: `mutation Login($email: String!, $password: String!){ login(email: $email, password: $password, device: "web") 
      }`,
        operationName: "Login",
        variables: {
          email: loginEmail,
          password: loginPassword,
        },
      })
      .then((response) => setToken(response.data.data.login));
  };

  const me = () => {
    axios
      .post(
        "https://hemmingway.herokuapp.com/graphql",
        {
          query: ` { me {
              name
              email
              id
          }}`,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => console.log("me: ", response));
  };

  return (
    <div>
      <h1>Auth Testing</h1>
      <p>Token: {token}</p>
      <h3>Register</h3>
      <label htmlFor="register-name">name</label>
      <input
        type="text"
        id="register-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="register-email">email</label>
      <input
        type="text"
        id="register-email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="register-password">password</label>
      <input
        type="password"
        id="register-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => {}}>Register</button>
      <h3>Login</h3>
      <label htmlFor="register-login-email">login email</label>
      <input
        type="text"
        id="register-login-email"
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
      />
      <label htmlFor="register-login-password">login password</label>
      <input
        type="password"
        id="register-login-password"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
      <button onClick={me}>Me Query</button>
      <button>Logout</button>
    </div>
  );
};

export default Auth;
