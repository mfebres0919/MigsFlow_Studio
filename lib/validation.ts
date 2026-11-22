// The rules for what may be typed into Studio's own forms. They live here,
// apart from the forms, so one set of rules can be shared (and later tested,
// and repeated on the server, which must never trust what a browser sends).
//
// Each rule returns a message to show, or null when the value is fine.

/** Tidies what someone typed into a domain box: "https://WWW.Example.com/" → "example.com". */
export function cleanDomain(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "");
}

export function validateDomain(domain: string): string | null {
  if (!domain) return "Enter your domain, for example yourbusiness.com.";
  // Letters, numbers and hyphens in each part, with at least one dot and a real-looking ending.
  if (!/^(?!-)[a-z0-9-]{1,63}(?<!-)(\.(?!-)[a-z0-9-]{1,63}(?<!-))+$/.test(domain) || !/\.[a-z]{2,}$/.test(domain)) {
    return "That does not look like a domain. It should look like yourbusiness.com.";
  }
  return null;
}

export function validateName(name: string): string | null {
  return name.trim() ? null : "Enter a name.";
}

export function validateEmail(email: string): string | null {
  if (!email.trim()) return "Enter an email address.";
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? null : "Enter a valid email address, like you@example.com.";
}
