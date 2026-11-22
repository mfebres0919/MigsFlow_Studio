import Link from "next/link";

// One button for the whole app. Pages choose a "variant" (how loud it is) and
// the classes stay in here, so every button looks and behaves the same.
// In the plain CSS version this was a .btn class with .btn--primary modifiers.

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "md" | "sm";

// The props (inputs) this component accepts. The "?" marks one as optional.
// "& React.ComponentProps<'button'>" adds everything a normal <button> takes
// (type, disabled, onClick …) without listing each one.
type ButtonProps = {
  variant?: Variant;
  size?: Size;
  /** Give an address and it becomes a link that looks like a button. */
  href?: string;
} & React.ComponentProps<"button">;

// Tailwind finds classes by reading files as text, so each class is written
// out in full here. Building names in pieces (`bg-${color}`) would not work.
const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-hover",
  secondary: "border border-line-strong text-fg hover:bg-raised",
  ghost: "text-fg-muted hover:bg-raised hover:text-fg",
  danger: "border border-danger text-danger hover:bg-danger hover:text-ink",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-base", // 44px tall: a comfortable tap target
  sm: "h-9 px-3.5 text-sm",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  ...buttonProps
}: ButtonProps) {
  const className = `inline-flex items-center justify-center gap-2 rounded-control font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]}`;

  // A button DOES something on the page; a link GOES somewhere. Same look,
  // different element, so keyboards and screen readers treat each correctly.
  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={className} {...buttonProps}>
      {children}
    </button>
  );
}
