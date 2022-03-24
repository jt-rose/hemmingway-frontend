import Gallery from "../components/Gallery";
import axios from "axios";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    axios
      .post("https://hemmingway.herokuapp.com/graphql", {
        query: `mutation {
             createUser(name: "jeff123", email: "jeffrose2@fake.com", password: "password") {
               name
               email
               id
             }
           }`,
      })
      .then((response) => console.log(response));
  }, []);
  return <Gallery />;
};

export default Index;
