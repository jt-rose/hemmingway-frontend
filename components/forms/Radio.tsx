export const Radio = (props: {
  radioOptions: { displayName: string; value: string }[];
  name: string;
  formConnect: any;
  formtype: string;
}) => {
  return (
    <fieldset className="flex justify-around mx-auto max-w-xs">
      <legend className="sr-only">Countries</legend>
      {props.radioOptions.map((ro, index) => (
        <div
          className="flex items-center mb-4"
          key={"radio-" + ro.displayName + "-" + props.formtype}
        >
          <input
            {...props.formConnect}
            id={ro.value + "-radio-" + index}
            type="radio"
            name={props.name}
            value={ro.value}
            className="w-4 h-4 border-gray-300 appearance-none checked:bg-teal-400 rounded-xl border-2 checked:border-teal-500  "
            aria-labelledby={ro.value + "-radio-" + index}
            aria-describedby={ro.value + "-radio-" + index}
          />
          <label
            htmlFor={ro.value + "-radio-" + index}
            className="block ml-2 text-sm font-bold text-gray-900 "
          >
            {ro.displayName}
          </label>
        </div>
      ))}
    </fieldset>
  );
};
