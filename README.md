# View counter badge for any page

![views](https://b59.link/badge.svg?id=09f2e391-6eb5-4b9c-ab92-86cd4cd65adb)

Copy-paste snippets for showing a page-view count on a portfolio, a blog post or a docs page, using the free
counter at [b59.link](https://b59.link/tools/view-counter). No database, no account, no cookies.

There are two pieces:

1. **A tag** on your site that counts each visit.
2. **A badge**, an SVG image that shows the total. It works anywhere an image does, including a GitHub README.

The badge above is live: it's the count for b59.link itself.

*Disclosure: this repo is maintained by Biz59 LLC, the company that runs b59.link.*

## 1. Get a tracker ID

On [b59.link/tracker](https://b59.link/tracker), enter your site's address. You get an ID (a UUID) and a stats
page. No sign-up.

Or from a terminal:

```bash
curl -s https://b59.link/api/trackers -H 'Content-Type: application/json' \
  -d '{"site_url":"example.com"}'
```

The answer has `uuid` (your tracker ID), `stats_url`, and a `manage_token`; keep the token if you want to attach
the tracker to an account later.

In everything below, replace `YOUR-TRACKER-ID` with that ID.

## 2. Add the tag and the badge

### Plain HTML

```html
<script>(function(){var i=new Image();i.referrerPolicy="no-referrer-when-downgrade";
i.src="https://b59.link/tag?id=YOUR-TRACKER-ID&u="+encodeURIComponent(location.href)+"&r="+encodeURIComponent(document.referrer);})();</script>
<img src="https://b59.link/badge.svg?id=YOUR-TRACKER-ID" alt="views" height="20">
```

Put the script once in your layout so every page is counted, and the `<img>` wherever the number should show.

### Markdown (GitHub README, docs)

```md
![views](https://b59.link/badge.svg?id=YOUR-TRACKER-ID)
```

This shows the count from your site. A README can't run the tag, so views of the README itself aren't counted.

### One page only

Add `path` to show one page's count instead of the whole site's. It must match the page's path exactly, trailing slash included:

```html
<img src="https://b59.link/badge.svg?id=YOUR-TRACKER-ID&path=/blog/my-post" alt="views" height="20">
```

### A different label

```md
![readers](https://b59.link/badge.svg?id=YOUR-TRACKER-ID&label=readers)
```

Up to 24 characters.

### Frameworks

Ready-made files are in [`examples/`](examples):

| File | For |
|---|---|
| [`plain.html`](examples/plain.html) | Any static page |
| [`ViewCounter.tsx`](examples/ViewCounter.tsx) | React and Next.js (counts client-side route changes too) |
| [`ViewCounter.astro`](examples/ViewCounter.astro) | Astro |
| [`hugo-shortcode.html`](examples/hugo-shortcode.html) | Hugo: save as `layouts/shortcodes/views.html` |
| [`jekyll-include.html`](examples/jekyll-include.html) | Jekyll and GitHub Pages: save as `_includes/views.html` |

Each one shows the count for the current page. Drop the `path` part to show the whole site's total.

## Badge parameters

`https://b59.link/badge.svg`

| Parameter | Required | Meaning |
|---|---|---|
| `id` | yes | Your tracker ID. |
| `path` | no | Count one page, e.g. `/docs/intro`. Without it: all pages. |
| `label` | no | Text on the left. Default `views`, up to 24 characters. |

## Good to know

- **The badge is a few minutes behind.** Counts are cached for five minutes, so your own visit shows up a little
  later. GitHub also caches README images on its side.
- **Visits are counted on the tracker's own domain** and its subdomains. A tag pasted on another site counts
  nothing.
- **The same visitor on the same page within 10 seconds counts once**, so a tag that ends up on a page twice does
  no harm.
- **Known bots and browsers sending Do Not Track are skipped.** Numbers will be lower than raw server logs.
- **No cookies.** The badge shows a number only: never visitors, places or referrers. Those are on your stats
  page.
- **Only public trackers show a number.** A tracker you've set to private shows "private".
- **No JavaScript?** `<img src="https://b59.link/tag?YOUR-TRACKER-ID" width="1" height="1" alt=""
  referrerpolicy="no-referrer-when-downgrade">` counts visits without a script. The script version records the
  page and referrer more reliably.
- It's a hosted service, so the usual caveat applies: if b59.link is down, the badge doesn't load. Your page
  isn't affected otherwise.

Prefer to build the badge with a form and a live preview? Use the
[view counter tool](https://b59.link/tools/view-counter).

## Licence

The snippets and examples are [MIT](LICENSE). Use them however you like.
