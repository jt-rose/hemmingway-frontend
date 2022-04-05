export const Select = (props: {
  selectOptions: string[];
  label: string;
  id: string;
  formConnect: any;
}) => {
  return (
    <div key={props.id + "-" + props.label} className="mb-6">
      <label
        htmlFor={props.id}
        className="block font-bold text-center mb-2 text-sm text-gray-900 "
      >
        {props.label}
      </label>
      <select
        {...props.formConnect}
        id={props.id}
        className="bg-gray-50 text-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
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
