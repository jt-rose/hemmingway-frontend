import { Layout } from "components/Layout";
import { LoaderStack } from "components/Loader";
import { SettingsData } from "components/SettingsData";
import { PropTypes } from "types/propTypes";

import { useCurrentGoalsQuery } from "../src/generated/graphql-hooks";

const Settings = (props: PropTypes) => {
  const { data } = useCurrentGoalsQuery(props.gqlClient);

  console.log(data);
  return (
    <Layout>
      {!data && <LoaderStack />}
      {data && <SettingsData data={data} gqlClient={props.gqlClient} />}
    </Layout>
  );
};

export default Settings;
