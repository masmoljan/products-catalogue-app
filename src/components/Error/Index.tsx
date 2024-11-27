import { ERROR_MESSAGE, ERROR_MESSAGE_REFERENCE } from "@/utils/constants";

interface ErrorProps {
  errorMessage?: string
}

export function Error ({
  errorMessage
} : ErrorProps) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="rounded-xl bg-slate-200 p-4 text-center">
        <p>{ERROR_MESSAGE}</p><br></br>
        <p>{ERROR_MESSAGE_REFERENCE} {errorMessage}</p>
      </div>
    </div>
  );
}