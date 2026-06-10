import { useFormStatus } from "react-dom";

export const SubmitButton = () => {
  const status = useFormStatus(); // Search the form tag base on the tree component
  return (
    <button
      type="submit"
      className={`bg-blue-500 text-white p-2 rounded flex-1 sm:flex-none ${status.pending ? "disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed" : ""}`}
      disabled={status.pending}
    >
      Agregar planeta
    </button>
  );
};
