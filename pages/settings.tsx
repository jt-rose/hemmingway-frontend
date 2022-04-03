import { Layout } from "components/Layout";
import { LoaderStack } from "components/Loader";
import { SettingsData } from "components/SettingsData";
import { PropTypes, PropTypesWithRefresh } from "types/propTypes";

import { useCurrentGoalsQuery } from "../src/generated/graphql-hooks";

const Settings = (props: PropTypesWithRefresh) => {
  const { data } = useCurrentGoalsQuery(props.gqlClient);

  console.log(data);
  return (
    <Layout gqlClient={props.gqlClient} setToken={props.setToken}>
      {!data && <LoaderStack />}
      {data && <SettingsData data={data} gqlClient={props.gqlClient} />}
    </Layout>
  );
};

export default Settings;
