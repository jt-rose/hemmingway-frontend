import { Layout } from "components/Layout";
import { LoaderStack } from "components/Loader";
import { SettingsData } from "components/SettingsData";
import { useRouter } from "next/router";
import { PropTypesWithRefresh } from "types/propTypes";

import { useCurrentGoalsQuery } from "../src/generated/graphql-hooks";

const Settings = (props: PropTypesWithRefresh) => {
  const { data, isLoading } = useCurrentGoalsQuery(
    props.gqlClient,
    {},
    { retry: 1 }
  );
  const router = useRouter();

  console.log(data);
  if (!isLoading && !data?.me) {
    router.push("/");
  }
  return (
    <Layout gqlClient={props.gqlClient} setToken={props.setToken}>
      {!data && <LoaderStack />}
      {data && <SettingsData data={data} gqlClient={props.gqlClient} />}
    </Layout>
  );
};

export default Settings;
