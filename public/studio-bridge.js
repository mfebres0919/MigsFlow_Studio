/* ==========================================================================
   MigsFlow Studio bridge

   This one script is what turns a hand-written HTML, CSS and JavaScript
   website into a Studio template. Add it to the page:

       <script src="/studio-bridge.js" defer></script>

   and mark the parts a customer may change with attributes:

     data-edit="home/hero/heading"        the element's text (click and type in Studio)
     data-mirror="site/contact/phone"     shows the same value somewhere else; not clickable
     data-edit-image="home/hero/image"    on an <img>: its picture and description
     data-edit-tel="site/contact/phone"   on a link: href becomes tel:…
     data-edit-mailto="site/contact/email" on a link: href becomes mailto:…
     data-edit-map="site/contact"         on a link: href becomes a map search for that section's address fields
     data-edit-href="site/social/facebook" on a link: href becomes the value; hidden if empty
     data-edit-content="home/seo/description" on a <meta>: its content attribute
     data-edit-section="home/reviews"     on a section the customer may switch off
                                          (schema: hideable); hidden while switched off.
                                          Put the same marker on its menu link to hide that too.

   An address is  where/section/field , where "where" is "site" (shared
   settings) or a page such as "home". A field inside one entry of a list is
   where/section/list/entry-id/field .

   Opened on its own, outside Studio, this script does nothing at all and the
   page shows exactly what is written in its HTML.

   Plain JavaScript on purpose: the template pages have no build step.
   ========================================================================== */
(function () {
    "use strict";

    // Only run inside Studio: the page must be in a frame on the same site.
    if (window.parent === window) return;

    const ORIGIN = window.location.origin;
    const editing = new URLSearchParams(window.location.search).get("studio") === "edit";

    let content = null;          // the newest content sent by Studio
    const pictureUrls = {};      // uploaded pictures already read from the browser's storage
    const waitingFor = {};       // uploaded pictures being read right now

    function tellStudio(message) {
        window.parent.postMessage(message, ORIGIN);
    }

    /* ---------- Finding a value by its address ---------- */

    function lookUp(path) {
        if (!content || !path) return undefined;
        const parts = path.split("/");
        const where = parts[0] === "site" ? content.site : (content.pages || {})[parts[0]];
        const section = where && where[parts[1]];
        if (!section) return undefined;
        const value = section[parts[2]];
        if (parts.length === 3) return value;
        // An entry in a list, found by its id.
        if (!Array.isArray(value)) return undefined;
        const entry = value.find(function (item) { return item.id === parts[3]; });
        return entry ? entry[parts[4]] : undefined;
    }

    // The words of a value. A button value is { label, href }; its words are the label.
    function wordsOf(value) {
        if (value === undefined || value === null) return "";
        return typeof value === "object" ? (value.label || "") : String(value);
    }

    /* ---------- Uploaded pictures ----------
       A picture the customer uploaded is stored in the browser (IndexedDB) and
       appears in the content as "media:<id>". It has to be read from storage
       and turned into an address an <img> can show. */

    function readPicture(id) {
        return new Promise(function (resolve) {
            const request = indexedDB.open("migsflow-studio-media");
            request.onerror = function () { resolve(null); };
            request.onsuccess = function () {
                const database = request.result;
                if (!database.objectStoreNames.contains("images")) return resolve(null);
                const get = database.transaction("images").objectStore("images").get(id);
                get.onerror = function () { resolve(null); };
                get.onsuccess = function () {
                    const stored = get.result;
                    if (!stored) return resolve(null);
                    resolve(stored.data ? new Blob([stored.data], { type: stored.type }) : (stored.blob || null));
                };
            };
        });
    }

    // Gives back a showable address straight away if it can; otherwise reads
    // the picture and re-applies the content once it is ready.
    function showable(src) {
        if (!src || src.indexOf("media:") !== 0) return src;
        const id = src.slice(6);
        if (pictureUrls[id]) return pictureUrls[id];
        if (!waitingFor[id]) {
            waitingFor[id] = true;
            readPicture(id).then(function (blob) {
                delete waitingFor[id];
                if (blob) {
                    pictureUrls[id] = URL.createObjectURL(blob);
                    apply();
                }
            });
        }
        return "";
    }

    /* ---------- Pictures ----------
       The original <img> often sits inside a <picture> with <source> tags that
       offer smaller or newer-format versions of the SAME photo. When the
       customer picks a different photo, those would win over the new one, so
       they are switched off. Choosing the original again switches them back on. */

    // "images/hero-truck-m.jpg" and "/x/images/hero-truck.webp" are the same photo: "hero-truck".
    function photoName(address) {
        return (address || "").split("?")[0].split("/").pop().replace(/(-m)?\.[a-z0-9]+$/i, "");
    }

    function setPicture(img, value) {
        if (!value || typeof value !== "object") return;
        if (!img.hasAttribute("data-original-src")) img.setAttribute("data-original-src", img.getAttribute("src") || "");
        const original = img.getAttribute("data-original-src");
        const unchanged = photoName(value.src) === photoName(original);
        const sources = img.parentElement && img.parentElement.tagName === "PICTURE"
            ? img.parentElement.querySelectorAll("source") : [];

        sources.forEach(function (source) {
            if (!source.hasAttribute("data-original-srcset")) {
                source.setAttribute("data-original-srcset", source.getAttribute("srcset") || "");
            }
            if (unchanged) source.setAttribute("srcset", source.getAttribute("data-original-srcset"));
            else source.removeAttribute("srcset");
        });

        const address = unchanged ? original : showable(value.src);
        if (address && img.getAttribute("src") !== address) img.setAttribute("src", address);
        if (typeof value.alt === "string" && img.getAttribute("alt") !== value.alt) img.setAttribute("alt", value.alt);
    }

    /* ---------- Colors ----------
       A template lists which of its CSS variables follow the customer's colors:
           <html data-studio-colors="--color-red:site/brand/color, …">
       A variable name ending in "*lighter", "*soft", "*darker" or "*deep" gets
       that shade of the same color.

       Decorative SVG pictures used as backgrounds have their colors drawn in,
       so CSS cannot change them. Those are listed too:
           <html data-studio-textures="--texture-streaks:images/streaks.svg, …">
       When the main color changes, the bridge makes a recolored copy of each
       picture and hands it to the page through that CSS variable. */

    // How far each named shade moves: toward white (positive) or black (negative).
    const SHADES = { lighter: 0.12, soft: 0.5, darker: -0.32, deep: -0.62 };

    function shade(hex, amount) {
        const match = /^#([0-9a-f]{6})$/i.exec(hex || "");
        if (!match) return null;
        const channels = [0, 2, 4].map(function (start) {
            const value = parseInt(match[1].slice(start, start + 2), 16);
            // amount > 0 moves toward white, amount < 0 toward black.
            const moved = amount >= 0 ? value + (255 - value) * amount : value * (1 + amount);
            return Math.max(0, Math.min(255, Math.round(moved))).toString(16).padStart(2, "0");
        });
        return "#" + channels.join("");
    }

    let originalColors = null; // the page's own colors, by address, read once

    function applyColors() {
        const root = document.documentElement;
        const list = root.getAttribute("data-studio-colors");
        if (!list) return;
        const entries = list.split(",").map(function (pair) {
            const bits = pair.split(":");
            const nameBits = bits[0].trim().split("*");
            return { name: nameBits[0], shade: nameBits[1] || "", path: (bits[1] || "").trim() };
        });

        if (!originalColors) {
            originalColors = {};
            const computed = getComputedStyle(root);
            entries.forEach(function (entry) {
                if (!entry.shade) originalColors[entry.path] = computed.getPropertyValue(entry.name).trim().toLowerCase();
            });
        }

        entries.forEach(function (entry) {
            const color = lookUp(entry.path);
            if (typeof color !== "string" || !/^#[0-9a-f]{6}$/i.test(color)) return;
            // Unchanged: take our override away, so the page shows its own
            // hand-picked colors and shades exactly as designed.
            if (color.toLowerCase() === originalColors[entry.path]) {
                root.style.removeProperty(entry.name);
                return;
            }
            const value = entry.shade in SHADES ? shade(color, SHADES[entry.shade]) : color;
            if (value) root.style.setProperty(entry.name, value);
        });

        applyTextures(entries[0] ? entries[0].path : "");
    }

    /* ---------- Recoloring decorative SVG backgrounds ---------- */

    // A color as hue (0-360), saturation and lightness (0-1), and back.
    function toHsl(hex) {
        const r = parseInt(hex.slice(1, 3), 16) / 255, g = parseInt(hex.slice(3, 5), 16) / 255, b = parseInt(hex.slice(5, 7), 16) / 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2, d = max - min;
        if (d === 0) return { h: 0, s: 0, l: l };
        const s = d / (1 - Math.abs(2 * l - 1));
        let h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
        h = (h * 60 + 360) % 360;
        return { h: h, s: s, l: l };
    }
    function fromHsl(h, s, l) {
        const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = l - c / 2;
        const rgb = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
        return "#" + rgb.map(function (v) { return Math.round((v + m) * 255).toString(16).padStart(2, "0"); }).join("");
    }

    const textureFiles = {};   // the original SVG text of each file, read once
    let texturesFor = null;    // the color the current textures were made for

    function applyTextures(mainPath) {
        const root = document.documentElement;
        const list = root.getAttribute("data-studio-textures");
        if (!list || !originalColors) return;
        const original = originalColors[mainPath];
        const color = lookUp(mainPath);
        if (typeof color !== "string" || !/^#[0-9a-f]{6}$/i.test(color) || !/^#[0-9a-f]{6}$/i.test(original || "")) return;
        if (texturesFor === color.toLowerCase()) return; // already done for this color
        texturesFor = color.toLowerCase();

        const entries = list.split(",").map(function (pair) {
            const at = pair.indexOf(":");
            return { name: pair.slice(0, at).trim(), file: pair.slice(at + 1).trim() };
        });

        // Unchanged: the page uses its own files again.
        if (texturesFor === original) {
            entries.forEach(function (entry) { root.style.removeProperty(entry.name); });
            return;
        }

        const from = toHsl(original), to = toHsl(color);
        entries.forEach(function (entry) {
            const ready = textureFiles[entry.file]
                ? Promise.resolve(textureFiles[entry.file])
                : fetch(entry.file).then(function (response) { return response.text(); });
            ready.then(function (svg) {
                textureFiles[entry.file] = svg;
                if (texturesFor !== color.toLowerCase()) return; // the color changed again meanwhile
                // Every color in the picture that belongs to the original color's
                // family (close in hue) moves to the new color's hue, keeping how
                // light or dark it was. Greys, black and white are left alone.
                const recolored = svg.replace(/#[0-9a-f]{6}\b/gi, function (hex) {
                    const c = toHsl(hex);
                    const apart = Math.min(Math.abs(c.h - from.h), 360 - Math.abs(c.h - from.h));
                    if (c.s < 0.15 || apart > 25) return hex;
                    return fromHsl(to.h, Math.min(1, c.s * (from.s ? to.s / from.s : 1)), c.l);
                });
                root.style.setProperty(entry.name, 'url("data:image/svg+xml,' + encodeURIComponent(recolored) + '")');
            }).catch(function () { /* the picture could not be read: the original stays */ });
        });
    }

    /* ---------- Putting the content on the page ---------- */

    function digits(phone) {
        return String(phone || "").replace(/[^\d+]/g, "");
    }

    function apply() {
        if (!content) return;

        // Text. The element being typed in is left alone, or the typing
        // cursor would jump; everything else showing that value follows along.
        document.querySelectorAll("[data-edit], [data-mirror]").forEach(function (element) {
            const value = lookUp(element.getAttribute("data-edit") || element.getAttribute("data-mirror"));
            if (value === undefined || typeof value === "object" && !("label" in value)) return;
            if (element === document.activeElement && element.isContentEditable) return;
            const words = wordsOf(value);
            if (element.textContent !== words) element.textContent = words;
        });

        document.querySelectorAll("[data-edit-image]").forEach(function (img) {
            setPicture(img, lookUp(img.getAttribute("data-edit-image")));
        });

        document.querySelectorAll("[data-edit-tel]").forEach(function (link) {
            const value = lookUp(link.getAttribute("data-edit-tel"));
            if (value !== undefined) link.setAttribute("href", "tel:" + digits(value));
        });

        document.querySelectorAll("[data-edit-mailto]").forEach(function (link) {
            const value = lookUp(link.getAttribute("data-edit-mailto"));
            if (value !== undefined) link.setAttribute("href", "mailto:" + String(value).trim());
        });

        // A map link, built from every field in that section whose name
        // starts with "address" (street, city, ZIP …), in the order they are listed.
        document.querySelectorAll("[data-edit-map]").forEach(function (link) {
            const parts = link.getAttribute("data-edit-map").split("/");
            const where = parts[0] === "site" ? content.site : (content.pages || {})[parts[0]];
            const section = (where && where[parts[1]]) || {};
            const lines = Object.keys(section)
                .filter(function (key) { return key.indexOf("address") === 0 && section[key]; })
                .map(function (key) { return section[key]; });
            if (lines.length) link.setAttribute("href", "https://maps.google.com/?q=" + encodeURIComponent(lines.join(", ")));
        });

        // A plain link, e.g. a social profile. Left empty, its list item is hidden.
        document.querySelectorAll("[data-edit-href]").forEach(function (link) {
            const value = lookUp(link.getAttribute("data-edit-href"));
            if (value === undefined) return;
            const address = typeof value === "object" ? value.href : String(value).trim();
            (link.closest("li") || link).hidden = !address;
            link.setAttribute("href", address || "#");
        });

        document.querySelectorAll("[data-edit-content]").forEach(function (meta) {
            const value = lookUp(meta.getAttribute("data-edit-content"));
            if (value !== undefined) meta.setAttribute("content", wordsOf(value));
        });

        // Sections the customer has switched off (content.hidden lists them as "page/section").
        const hidden = Array.isArray(content.hidden) ? content.hidden : [];
        document.querySelectorAll("[data-edit-section]").forEach(function (element) {
            const off = hidden.indexOf(element.getAttribute("data-edit-section")) !== -1;
            // A menu link usually sits in a list item: hide the whole item.
            const target = element.tagName === "A" ? element.closest("li") || element : element;
            target.hidden = off;
            // The page's own CSS (e.g. "display: grid") would beat "hidden", so set display as well.
            target.style.display = off ? "none" : "";
        });

        applyColors();
    }

    /* ---------- Messages from Studio ---------- */

    window.addEventListener("message", function (event) {
        // Only listen to our own site, and only to the page this one is framed in.
        if (event.origin !== ORIGIN || event.source !== window.parent) return;
        const message = event.data;
        if (!message || message.type !== "studio:content") return;
        content = message.content;
        apply();
    });

    // Forms never really send while the page is inside Studio. The page's own
    // script still shows its thank-you message; this tells the customer why
    // nothing arrived.
    document.addEventListener("submit", function () {
        tellStudio({ type: "studio:notice", text: "This is a preview, so the form did not send anything." });
    }, true);

    /* ---------- Editing by clicking (only in the editor) ---------- */

    if (editing) {
        const styles = document.createElement("link");
        styles.rel = "stylesheet";
        styles.href = "/studio-bridge.css";
        document.head.appendChild(styles);
        document.documentElement.classList.add("studio-editing");

        // Text can be typed in place, unless it sits somewhere typing does not
        // work (inside a real <button> or a <select>) or is never shown (<title>).
        const cannotType = "button, select, option, title, [data-edit-mode='jump']";

        function prepare() {
            document.querySelectorAll("[data-edit]").forEach(function (element) {
                if (element.hasAttribute("data-edit-kind")) return;
                const typing = !element.closest(cannotType);
                element.setAttribute("data-edit-kind", typing ? "text" : "jump");
                if (typing) {
                    // "plaintext-only": typing and pasting can only add plain text, never formatting.
                    element.contentEditable = "plaintext-only";
                    element.spellcheck = true;
                }
            });
            document.querySelectorAll("[data-edit-image]").forEach(function (img) {
                img.setAttribute("data-edit-kind", "jump");
            });
        }

        function marked(target) {
            return target instanceof Element ? target.closest("[data-edit], [data-edit-image]") : null;
        }

        function pathOf(element) {
            return element.getAttribute("data-edit") || element.getAttribute("data-edit-image");
        }

        function report(element) {
            // Browsers sometimes type a "non-breaking space"; store an ordinary one.
            tellStudio({ type: "studio:edit", path: pathOf(element), value: element.textContent.replace(/ /g, " ") });
        }

        // "true" as the last argument means these run BEFORE the page's own
        // click handlers, so a marked button or link is edited, not followed.
        document.addEventListener("click", function (event) {
            const element = marked(event.target);
            if (element) {
                event.preventDefault();
                event.stopPropagation();
                tellStudio({ type: "studio:select", path: pathOf(element), typing: element.getAttribute("data-edit-kind") === "text" });
                return;
            }
            // Other links: jumps within the page still work; links that leave do not.
            const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
            if (link && link.getAttribute("href").charAt(0) !== "#") {
                event.preventDefault();
                tellStudio({ type: "studio:notice", text: "Links that leave your website are switched off in the preview." });
            }
        }, true);

        document.addEventListener("input", function (event) {
            const element = marked(event.target);
            if (!element || element.getAttribute("data-edit-kind") !== "text") return;
            // While a character is still being composed (accents, Chinese, Japanese …) wait for it to finish.
            if (event.isComposing) return;
            report(element);
        });

        document.addEventListener("compositionend", function (event) {
            const element = marked(event.target);
            if (element && element.getAttribute("data-edit-kind") === "text") report(element);
        });

        // Each field is one run of text, so Enter ends the edit instead of adding a line.
        document.addEventListener("keydown", function (event) {
            const element = marked(event.target);
            if (!element || element.getAttribute("data-edit-kind") !== "text") return;
            if (event.key === "Enter" || event.key === "Escape") {
                event.preventDefault();
                event.stopPropagation();
                element.blur();
            }
        }, true);

        // When an edit ends, redraw, so anything typed is shown exactly as it was stored.
        document.addEventListener("focusout", function () {
            window.setTimeout(apply, 0);
        });

        /* Dropping a picture file onto a photo. A browser's normal reaction to
           a dropped file is to OPEN it, replacing the page; that is stopped
           everywhere. If the file lands on a marked photo, Studio gets it. */
        let over = null;
        function highlight(element) {
            if (over === element) return;
            if (over) over.removeAttribute("data-drop-over");
            if (element) element.setAttribute("data-drop-over", "");
            over = element;
        }
        function photoUnder(event) {
            return event.target instanceof Element ? event.target.closest("[data-edit-image]") : null;
        }
        function hasFiles(event) {
            return event.dataTransfer && Array.prototype.indexOf.call(event.dataTransfer.types, "Files") !== -1;
        }
        window.addEventListener("dragover", function (event) {
            if (!hasFiles(event)) return;
            event.preventDefault();
            const photo = photoUnder(event);
            event.dataTransfer.dropEffect = photo ? "copy" : "none";
            highlight(photo);
        });
        window.addEventListener("dragleave", function (event) {
            if (!event.relatedTarget) highlight(null);
        });
        window.addEventListener("drop", function (event) {
            if (!hasFiles(event)) return;
            event.preventDefault();
            const photo = photoUnder(event);
            const file = event.dataTransfer.files[0];
            highlight(null);
            if (photo && file) tellStudio({ type: "studio:drop-image", path: photo.getAttribute("data-edit-image"), file: file });
        });

        prepare();
    }

    // Tell Studio the page is listening. Studio answers with the content.
    tellStudio({ type: "studio:ready" });
})();
