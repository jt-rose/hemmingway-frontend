export const Select = (props: {
  selectOptions: string[];
  label: string;
  id: string;
  formConnect: any;
}) => {
  return (
    <div key={props.id + "-" + props.label}>
      <label
        htmlFor={props.id}
        className="block font-bold text-center mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        {props.label}
      </label>
      <select
        {...props.formConnect}
        id={props.id}
        className="bg-gray-50 text-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {props.selectOptions.map((so) => (
          <option value={so} key={so + "-" + props.id}>
            {so}
          </option>
        ))}
      </select>
    </div>
  );
};
