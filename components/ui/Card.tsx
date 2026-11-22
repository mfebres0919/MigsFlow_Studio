// A panel that groups related content. Title and action are optional.

type CardProps = {
  title?: string;
  description?: string;
  /** Something for the top-right corner, usually a small Button. */
  action?: React.ReactNode;
  children: React.ReactNode;
};

export default function Card({ title, description, action, children }: CardProps) {
  return (
    <section className="rounded-panel border border-line bg-panel p-5 sm:p-6">
      {(title || action) && (
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            {title && <h2 className="text-lg font-semibold">{title}</h2>}
            {description && <p className="mt-1 text-sm text-fg-muted">{description}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
