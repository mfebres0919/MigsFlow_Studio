# Making a website into a Studio template

*For Miguelle. How to take a site you built in HTML, CSS and JavaScript and make it editable in MigsFlow Studio. The Moving Day template (`public/site-templates/moving-bayou/`) is the worked example.*

You do not rewrite anything. Studio shows your real page and fills in the customer's words and pictures. Your layout, CSS, sliders and animations stay exactly as you built them.

## The five steps

### 1. Put the site in Studio
Copy the finished site into `public/site-templates/<template-id>/` (for example `public/site-templates/moving-bayou/`). Keep `index.html`, your `css/`, `javascript/`, `fonts/` and `images/` folders. Leave out source images the page does not use.

### 2. Add one script to `index.html`
In the `<head>`, after your own scripts:

```html
<script src="/studio-bridge.js" defer></script>
```

Opened on its own, the page behaves exactly as before. The script only wakes up inside Studio.

### 3. Mark what a customer may change
Add an attribute to each element. The value is the field's **address**: `where/section/field`, where `where` is `site` (shared details such as the phone number) or the page (`home`).

| Attribute | Put it on | What it does |
|---|---|---|
| `data-edit="home/hero/heading"` | The element holding the text | The customer can click it and type. |
| `data-mirror="site/contact/phone"` | Another place showing the same value | Follows along, but is not clickable. Use it in menus, footers, `<option>`s. |
| `data-edit-image="home/hero/image"` | An `<img>` | The customer can replace the picture and its description. |
| `data-edit-tel="site/contact/phone"` | A phone link | Sets `href="tel:…"`. |
| `data-edit-mailto="site/contact/email"` | An email link | Sets `href="mailto:…"`. |
| `data-edit-map="site/contact"` | A map link | Builds a map search from that section's `address…` fields. |
| `data-edit-href="site/social/facebook"` | A plain link | Sets the link. If left empty, its `<li>` is hidden. |
| `data-edit-content="home/seo/description"` | A `<meta>` tag | Sets its `content`. |

Rules that keep it working:

- **The marked element must contain only that text.** If a button holds words and an icon, wrap the words: `<span data-edit="home/hero/buttonLabel">Get My Free Quote</span><svg …>`.
- **Part of a sentence gets its own `<span>`.** `Call <span data-mirror="site/contact/phone">(713) 555 0142</span>`.
- **A value shown in several places** gets `data-edit` where it is most natural to click, and `data-mirror` everywhere else.
- **Repeating things** (services, steps, numbers) use a longer address with an id for each one: `home/services/items/s1/title`, `home/services/items/s2/title`, and so on. The number of entries is fixed by your design; customers edit them but do not add or remove them.
- **Colors:** every brand color in your CSS should come from a variable (`var(--color-red)`), including inside gradients and see-through colors. For a see-through version write `color-mix(in srgb, var(--color-red) 35%, transparent)` instead of `rgba(200, 16, 46, 0.35)`. Then list the variables on the `<html>` tag. Add `*lighter`, `*soft`, `*darker` or `*deep` for a shade:
  `<html data-studio-colors="--color-red:site/brand/color, --color-red-bright*lighter:site/brand/color">`
- **Colored SVG backgrounds** have their colors drawn in, so list them too and use the variable in your CSS (`background: var(--texture-streaks, url("…streaks.svg"))`). Studio makes a recolored copy when the main color changes:
  `<html data-studio-textures="--texture-streaks:images/svg-backgrounds/streaks.svg">`

### 4. Generate the sample content
In the VS Code terminal, inside the Studio folder:

```bash
python3 tools/sample-content-from-html.py <template-id>
```

This reads the text and pictures already in your page and writes `templates/<template-id>/sample-content.json`. Run it again whenever you change the page's default wording.

### 5. Describe the fields
Three small files in `templates/<template-id>/`, copied from `templates/moving-bayou/` and adjusted:

- `schema.ts`: every address from step 3, with the label the customer sees and the kind of input (text, long text, phone, email, image, color). Mark what must be changed before publishing with `publishCheck: "required"`.
- `content.ts`: the placeholder text a new customer starts with, and the list of pictures that come with the template.
- `index.ts`: the template's id, the address of its page, and `heroImage`: the address of the big photo at the top (for example `home/hero/slides/h1/image`). Studio uses that photo as the website's picture in My Websites.

Then add it to `templates/registry.ts` and, with its price, to `lib/mock/templates.ts`. Claude can do this step from your marked-up page.

## Check it

1. Open `http://localhost:3000/site-templates/<template-id>/index.html`. It should look exactly like your original.
2. Open the template in the editor. Click text and type; change a photo; change the phone number under Site-wide settings and confirm it changes everywhere.

## What does not carry over yet

- **City-specific features** (the Houston map and ZIP checker were replaced by a simple list of areas).
- **Adding or removing** services or steps. The count is whatever the design has.
- **Fonts** are the template's own; the twelve font pairs apply to React-built templates only.
- **Forms** do not send anywhere yet, in any template.
