// The twinkling stars from migsflow.com, behind the landing page's hero and
// the footer. Each star is an empty <span>; app/globals.css ("Stars") gives
// each one its place, its glow and its twinkle, exactly like the main site's
// .star-field. In light mode they turn into small blue sparkles.
// Pure decoration, so screen readers skip it. Reduced motion: still stars.

type StarFieldProps = {
  /** How many stars (up to 20). */
  count?: number;
  /** Add the two shooting stars that cross every few seconds. */
  shooting?: boolean;
};

export default function StarField({ count = 20, shooting = false }: StarFieldProps) {
  return (
    <div aria-hidden="true" className="star-field">
      {Array.from({ length: Math.min(count, 20) }, (_, index) => (
        <span key={index} className="star" />
      ))}
      {shooting && (
        <>
          <span className="shooting-star shooting-star--one" />
          <span className="shooting-star shooting-star--two" />
        </>
      )}
    </div>
  );
}
