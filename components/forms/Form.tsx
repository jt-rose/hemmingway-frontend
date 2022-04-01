import { ReactNode } from "react";

export const Form = (props: {
  submitButtonName: string;
  onSubmit: any;
  children: ReactNode;
  closeModal?: () => void;
}) => {
  return (
    <div className="flex justify-center">
      <form
        onSubmit={props.onSubmit}
        className="mx-6 max-w-sm flex flex-col justify-items-center w-full"
      >
        {props.children}
        <button
          type="submit"
          className="text-white font-bold bg-teal-400 hover:bg-teal-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {props.submitButtonName}
        </button>
        {props.closeModal && <button onClick={props.closeModal}>Close</button>}
      </form>
    </div>
  );
};
