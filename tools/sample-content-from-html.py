#!/usr/bin/env python3
"""Builds a template's sample content from its marked-up HTML page.

A hand-written template (public/site-templates/<id>/index.html) already contains
its example text and pictures. This reads every element marked for Studio
(data-edit, data-mirror, data-edit-image, data-edit-content) and writes the
matching sample-content.json, so the page and its content can never disagree.

Run it again whenever the page's default wording or pictures change:

    python3 tools/sample-content-from-html.py moving-bayou

Sections that are not text on the page (colors, social links) are kept from
the existing sample-content.json if there is one.
"""
import json, os, re, sys
from html.parser import HTMLParser

if len(sys.argv) != 2:
    sys.exit("Usage: python3 tools/sample-content-from-html.py <template-id>")

template = sys.argv[1]
base = f"public/site-templates/{template}/"
target = f"templates/{template}/sample-content.json"
values, order = {}, []

# Tags that never have a closing tag, so they must not be tracked as "open".
VOID = {"img", "meta", "br", "source", "input", "link", "path", "rect", "circle", "polyline", "polygon", "line", "hr"}


class Reader(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.open = []  # [tag, address, text so far] for each element we are inside

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "data-edit-image" in a and a["data-edit-image"] not in values:
            # Prefer the full-size picture over the small "-m" phone version.
            src = a.get("src", "")
            full = re.sub(r"-m(\.\w+)$", r"\1", src)
            if not os.path.exists(base + full):
                full = src
            values[a["data-edit-image"]] = {"src": f"/site-templates/{template}/{full}", "alt": a.get("alt", "")}
            order.append(a["data-edit-image"])
        if "data-edit-content" in a and a["data-edit-content"] not in values:
            values[a["data-edit-content"]] = a.get("content", "")
            order.append(a["data-edit-content"])
        if tag not in VOID:
            self.open.append([tag, a.get("data-edit") or a.get("data-mirror"), ""])

    def handle_endtag(self, tag):
        while self.open:
            name, address, text = self.open.pop()
            if self.open:
                self.open[-1][2] += text
            if address and address not in values:
                values[address] = re.sub(r"\s+", " ", text).strip()
                order.append(address)
            if name == tag:
                break

    def handle_data(self, data):
        if self.open:
            self.open[-1][2] += data


Reader().feed(open(base + "index.html", encoding="utf-8").read())

content = {"site": {}, "pages": {}}
for address in order:
    parts = address.split("/")
    where = content["site"] if parts[0] == "site" else content["pages"].setdefault(parts[0], {})
    section = where.setdefault(parts[1], {})
    if len(parts) == 3:
        section[parts[2]] = values[address]
    else:  # a field inside one entry of a list
        entries = section.setdefault(parts[2], [])
        entry = next((item for item in entries if item["id"] == parts[3]), None)
        if entry is None:
            entry = {"id": parts[3]}
            entries.append(entry)
        entry[parts[4]] = values[address]

# Put list entries in order of the number in their id (s1, s2, … s10).
for where in [content["site"], *content["pages"].values()]:
    for section in where.values():
        for value in section.values():
            if isinstance(value, list):
                value.sort(key=lambda item: int(re.sub(r"\D", "", item["id"]) or 0))

# Keep the sections the page cannot show at all (colors, social links) from
# the previous file. Sections that do appear on the page are rebuilt from it.
if os.path.exists(target):
    old = json.load(open(target, encoding="utf-8"))
    for key, section in old.get("site", {}).items():
        if key not in content["site"]:
            content["site"][key] = section

json.dump(content, open(target, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
print(f"Wrote {target}: {len(order)} values from {base}index.html")
