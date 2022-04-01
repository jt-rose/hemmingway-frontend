export const Radio = (props: { radioOptions: string[]; name: string }) => {
  return (
    <fieldset className="flex justify-around max-w-xs">
      <legend className="sr-only">Countries</legend>
      {props.radioOptions.map((ro, index) => (
        <div className="flex items-center mb-4">
          <input
            id={ro + "-radio-" + index}
            type="radio"
            name={props.name}
            value={ro}
            className="w-4 h-4 border-gray-300 appearance-none checked:bg-teal-400 rounded-xl border-2 checked:border-teal-500 dark:accent-teal-700 dark:focus:bg-teal-600 dark:bg-gray-700 dark:border-gray-600"
            aria-labelledby={ro + "-radio-" + index}
            aria-describedby={ro + "-radio-" + index}
          />
          <label
            htmlFor={ro + "-radio-" + index}
            className="block ml-2 text-sm font-bold text-gray-900 dark:text-gray-300"
          >
            {ro}
          </label>
        </div>
      ))}
    </fieldset>
  );
};
