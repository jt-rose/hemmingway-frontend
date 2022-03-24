import Gallery from "../components/Gallery";
import axios from "axios";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    axios
      .post("https://hemmingway.herokuapp.com/graphql", {
        query: `{
            user(id: 79) {
              name
            }
          }`,
      })
      .then((response) => console.log(response));
  }, []);
  return <Gallery />;
};

export default Index;
