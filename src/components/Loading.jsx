import { CgSpinner } from "react-icons/cg";

export default function Loading() {
  return (
    <div className="w-full min-h-screen flex-1 flex justify-center items-center">
      <CgSpinner className="animate-spin size-10" />
    </div>
  );
}
