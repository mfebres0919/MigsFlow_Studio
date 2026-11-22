// The top of every dashboard page: the page's one <h1>, a sentence saying
// what the page is for, and optional buttons on the right.

type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
};

export default function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <h1 className="font-display text-2xl font-semibold tracking-wide sm:text-3xl">{title}</h1>
        {description && <p className="mt-2 text-fg-muted">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </div>
  );
}
