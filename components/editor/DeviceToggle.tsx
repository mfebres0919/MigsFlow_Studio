import { Monitor, MoveHorizontal, Smartphone, Tablet, type LucideIcon } from "lucide-react";

// The preview-size buttons above the preview.

export type Device = "fit" | "desktop" | "tablet" | "phone";

/**
 * How wide the previewed website is drawn for each choice, in pixels.
 * "fit" has no fixed width: the website is exactly as wide as the space it
 * has, so dragging the editing panel wider or thinner changes the website's
 * layout as you watch (like the responsive view in a browser's inspect tool).
 */
export const deviceWidths: Record<Exclude<Device, "fit">, number> = {
  desktop: 1280,
  tablet: 768,
  phone: 390,
};

const options: { device: Device; label: string; icon: LucideIcon }[] = [
  { device: "fit", label: "Fit", icon: MoveHorizontal },
  { device: "desktop", label: "Desktop", icon: Monitor },
  { device: "tablet", label: "Tablet", icon: Tablet },
  { device: "phone", label: "Phone", icon: Smartphone },
];

type DeviceToggleProps = {
  device: Device;
  onChange: (device: Device) => void;
};

export default function DeviceToggle({ device, onChange }: DeviceToggleProps) {
  return (
    <div role="group" aria-label="Preview size" className="flex rounded-control border border-line p-0.5">
      {options.map(({ device: option, label, icon: Icon }) => (
        <button
          key={option}
          type="button"
          aria-pressed={device === option}
          onClick={() => onChange(option)}
          className="flex min-h-9 items-center gap-2 rounded-[0.5rem] px-3 text-sm font-medium text-fg-muted hover:text-fg aria-pressed:bg-raised aria-pressed:text-fg"
        >
          <Icon aria-hidden="true" className="size-4" />
          {/* On a narrow screen only the icons show; the words stay for screen readers. */}
          <span className="sr-only sm:not-sr-only">{label}</span>
        </button>
      ))}
    </div>
  );
}
