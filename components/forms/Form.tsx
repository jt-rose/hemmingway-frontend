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
        className="mx-0 sm:mx-6 max-w-sm flex flex-col justify-items-center w-full"
      >
        {props.children}
        <button
          type="submit"
          className="text-white font-bold bg-teal-400 hover:bg-teal-500 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  "
        >
          {props.submitButtonName}
        </button>
        {props.closeModal && (
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              className="text-white font-bold bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  "
              onClick={props.closeModal}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
