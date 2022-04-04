export const ProgressBar = (props: {
  percentage: number;
  title: string;
  label: string;
}) => {
  return (
    <div className=" w-64 sm:w-80 m-auto">
      <div className="flex justify-between mb-1">
        <span className="text-base font-bold text-teal-500 dark:text-white">
          {props.title}
        </span>
        <span className="text-sm font-bold text-teal-500 dark:text-white">
          {props.label}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-teal-400 h-2.5 rounded-full"
          style={{ width: `${props.percentage}%` }}
        ></div>
      </div>
    </div>
  );
};
