# Chloe Chan — Personal Portfolio Site

A Jekyll-based personal portfolio site deployed on GitHub Pages.  
Live URL: **https://chungkitchan.github.io/chungkitchan/**

---

## Project Structure

```
_config.yml              ← Site settings, color theme, layout (edit here)
_sections/
  biography.md           ← Biography text and highlight cards
  contact.md             ← Contact links and tagline
portfolio.csv            ← Portfolio works (add/edit rows here)
_includes/               ← HTML templates (developer use)
_layouts/                ← Page layout shell (developer use)
assets/
  css/style.scss         ← All styles (developer use)
  js/portfolio.js        ← Portfolio CSV loader (developer use)
```

---

## Editing Content

### Biography — `_sections/biography.md`

Edit this file to change the biography text, influences, and highlight cards.

**Body text** (below the `---` closing line): plain Markdown, supports `**bold**`, `_italic_`, etc.

**Front matter fields:**

| Field | Description |
|---|---|
| `title` | Section heading shown on the page |
| `influences` | List of musical influence tags |
| `highlights` | List of 4 key-fact cards (icon, color, heading, detail) |

```yaml
---
title: Biography
influences:
  - Orchestra
  - Rock
highlights:
  - icon: "🎓"
    color: purple        # purple | pink | cyan | gold
    heading: "School Name"
    detail: "Degree or detail line"
---

Biography paragraph text goes here in **Markdown**.
```

---

### Contact — `_sections/contact.md`

Edit this file to change the contact section heading, description, and links.

| Field | Description |
|---|---|
| `tagline` | Large heading in the contact section |
| `description` | Subtitle paragraph |
| `links` | List of contact/social buttons |

Each link entry:

```yaml
links:
  - label: "Email Me"
    href: "mailto:you@example.com"
    icon: email            # email | youtube | instagram
  - label: "YouTube"
    href: "https://youtube.com/@yourhandle"
    icon: youtube
    external: true         # opens in new tab
```

---

### Portfolio — `portfolio.csv`

Add or edit rows to update the portfolio grid. The page reads this file automatically.

**Headers:**

| Column | Description |
|---|---|
| `title` | Work title |
| `category` | Category label (used for filter buttons) |
| `year` | Year of the work |
| `description` | Short description shown on the card |
| `link` | YouTube URL (watch or embed format — both work) |

**Example row:**
```
My Film Score,Film Score,2024,Original orchestral score for a short film.,https://www.youtube.com/watch?v=XXXXXXXXXXX
```

> Fields containing commas must be wrapped in double quotes.

---

## Changing the Color Theme

Open `_config.yml` and change the `color_theme` line:

```yaml
color_theme: dark   # ← change this
```

**Available themes:**

| Key | Background | Accent | Font | Feel |
|---|---|---|---|---|
| `dark` | Near-black | Purple / pink | Segoe UI | Vivid night (default) |
| `ocean` | Deep navy | Sky blue / teal | Georgia serif | Oceanic, editorial |
| `sakura` | Dark rose | Hot pink / coral | Palatino serif | Warm, romantic |
| `forest` | Deep green | Lime / emerald | Verdana | Earthy, organic |
| `light` | Off-white | Violet / crimson | Segoe UI | Clean, bright |

To create a custom theme, add a new key under `themes:` in `_config.yml` following the same structure as the existing ones.

---

## Changing the Layout

Open `_config.yml` and edit the `layout:` block:

```yaml
layout:
  bio_columns:       "2col"     # 2col | 1col | sidebar
  portfolio_columns: "auto"     # auto | 2col | 3col | 1col
  hero_style:        "centered" # centered | left
  max_width:         "960px"    # any CSS width value
  card_radius:       "12px"     # any CSS value — 0px = square, 24px = very rounded
  section_gap:       "5rem"     # vertical padding inside each section
```

| Option | Values | Effect |
|---|---|---|
| `bio_columns` | `2col` | Text left, cards right — equal width |
| | `sidebar` | Text narrow left, cards wide right |
| | `1col` | Stacked single column |
| `portfolio_columns` | `auto` | Responsive (~3 cols desktop, scales down) |
| | `2col` / `3col` / `1col` | Fixed column count |
| `hero_style` | `centered` | Centred hero text |
| | `left` | Left-aligned hero text |
| `max_width` | CSS value | Max width of all content areas |
| `card_radius` | CSS value | Corner rounding for cards and buttons |
| `section_gap` | CSS value | Top/bottom padding for each section |

> All layouts collapse to a single column on mobile (≤ 640px) automatically.

---

## Deploying Changes

After editing any file:

```bash
git add .
git commit -m "your message"
git push origin main
```

GitHub Pages will rebuild and publish the site within ~1 minute.

---

## Site Settings (`_config.yml`)

| Field | Description |
|---|---|
| `title` | Site title shown in the browser tab and nav |
| `description` | Meta description for search engines |
| `url` | Root GitHub Pages URL |
| `baseurl` | Sub-path (e.g. `/chungkitchan` for a project page) |
| `author.name` | Author name |
| `author.email` | Author email |
