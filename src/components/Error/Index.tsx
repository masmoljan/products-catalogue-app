import { ERROR_MESSAGE } from "@/utils/constants";

export default function Error () {
  return (
    <div title="error-component" className="flex flex-col justify-center items-center min-h-screen">
      <div className="rounded-xl bg-slate-200 p-4 text-center">
        <p>{ERROR_MESSAGE}</p><br></br>
      </div>
    </div>
  );
}