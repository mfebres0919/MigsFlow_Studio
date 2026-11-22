// Marks an element in a template as editable, by naming the field it shows.
//
// Every template must mark each piece of customer content this way. The
// marker is what lets someone click a heading in the editor's preview and
// change it right there: the preview reads the marker to learn which field
// was clicked.
//
// The marker is a "data-edit" attribute holding the field's address:
//   "home/hero/heading"                        page / section / field
//   "site/contact/phone"                       site-wide / section / field
//   "site/services/items/service-1/name"       … / list field / entry id / field inside the entry
//
// Use it by spreading it onto the element:  <h1 {...editable("home", "hero", "heading")}>
// The element must contain ONLY that field's text, nothing else. To mark part
// of a sentence, wrap that part in a <span>.
//
// On a finished website the attribute does nothing at all.

export function editable(...address: string[]) {
  return { "data-edit": address.join("/") };
}

/**
 * Like editable(), but clicking it only opens the field in the editor's form
 * instead of letting the customer type in place. For text that sits inside a
 * real <button>, where typing does not work reliably.
 */
export function editableInForm(...address: string[]) {
  return { "data-edit": address.join("/"), "data-edit-mode": "jump" };
}
