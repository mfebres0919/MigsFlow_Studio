import { TriangleAlert } from "lucide-react";
import Button from "@/components/ui/Button";

// Shown when data could not be loaded: what happened, and a way to retry.

type ErrorStateProps = {
  title: string;
  message: string;
  onRetry: () => void; // a function with no inputs that returns nothing
};

export default function ErrorState({ title, message, onRetry }: ErrorStateProps) {
  return (
    <div role="alert" className="rounded-panel border border-danger/50 px-6 py-10 text-center">
      <TriangleAlert aria-hidden="true" className="mx-auto size-8 text-danger" />
      <h2 className="mt-4 text-lg font-semibold">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-fg-muted">{message}</p>
      <div className="mt-6 flex justify-center">
        <Button variant="secondary" onClick={onRetry}>
          Try again
        </Button>
      </div>
    </div>
  );
}
