import Gallery from "../components/Gallery";
import axios from "axios";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    axios
      .post("https://hemmingway.herokuapp.com/graphql", {
        query: `{
            me {
              name
            }
          }`,
      })
      .then((response) => console.log(response));
  }, []);
  return <Gallery />;
};

export default Index;
