import { Layout } from "components/Layout";
import { PropTypes } from "types/propTypes";
import dayjs from "dayjs";
import { Exercise } from "../components/exercise/Exercise";
import { Meals } from "components/meals/Meals";

const Home = (props: PropTypes) => {
  const date = dayjs().format("YYYY-MM-DD");

  return (
    <Layout>
      <h1>Home</h1>
      <Exercise gqlClient={props.gqlClient} date={date} />
      <Meals gqlClient={props.gqlClient} date={date} />
    </Layout>
  );
};

export default Home;
