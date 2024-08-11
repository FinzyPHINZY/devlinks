import { useFormStatus } from "react-dom";

const SubmitButton = ({ children }) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-500 disabled:bg-blue-300 text-white disabled:text-gray-200 py-2 px-4 mx-auto flex gap-2 justify-center items-center"
    >
      {children}
    </button>
  );
};

export default SubmitButton;
