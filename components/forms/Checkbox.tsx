export const Checkbox = (props: {
  formConnect: any;
  label: string;
  placeholder: string;
  id: string;
  checked: boolean;
}) => {
  return (
    <div className="mb-6">
      <label
        htmlFor={props.id}
        className="block font-bold text-center mb-2 text-sm text-gray-900 "
      >
        {props.label}
      </label>
      <input
        type="checkbox"
        id={props.id}
        className="bg-gray-50 text-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={props.placeholder}
        {...props.formConnect}
      />
    </div>
  );
};
