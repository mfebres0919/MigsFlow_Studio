import { FlaskConical } from "lucide-react";

// Marks anything that is simulated or sample data. Project rule: nothing fake
// is ever shown without this label (logins, payments, publishing, sample
// customers and reviews).

type DemoLabelProps = {
  children?: React.ReactNode;
};

export default function DemoLabel({ children = "Demo mode" }: DemoLabelProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-warning/10 px-2.5 py-1 text-sm font-medium text-warning">
      <FlaskConical aria-hidden="true" className="size-4" />
      {children}
    </span>
  );
}
