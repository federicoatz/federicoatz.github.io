# federicoatz.com

Personal and academic website of [Federico Atzori, Ph.D.](https://federicoatz.com), behavioral economist at Sapienza University of Rome and the University of Cagliari. Research on social norms, cooperation, and experimental economics.

Live at **[federicoatz.com](https://federicoatz.com)**, served via GitHub Pages.

## Structure

Static site, no build step, no dependencies — plain HTML/CSS.

```
index.html      Home / landing page
about.html      Bio and background
research.html   Publications and working papers
teaching.html   Teaching activity
events.html     Talks, conferences, events
otree.html      Open-source oTree code for behavioral economics experiments
404.html        Custom not-found page
styles.css      Shared stylesheet for all pages
favicon.svg     Site favicon
robots.txt      Search engine crawl rules
sitemap.xml     Sitemap for search engines
CNAME           Custom domain config for GitHub Pages (federicoatz.com)
```

Every page shares the same header/nav and links to a single `styles.css`. Fonts are [Fraunces](https://fonts.google.com/specimen/Fraunces) (headings) and [Inter](https://fonts.google.com/specimen/Inter) (body), loaded from Google Fonts.

## Related project

The **power analysis** link in the nav points to [apriori-power-wizard](https://federicoatz.com/apriori-power-wizard/), a separate tool hosted under this domain — see that project's own repository for its source and docs.

## Editing

Pages are static HTML — edit directly and commit. No build/compile step is needed; GitHub Pages serves the repository as-is.

To preview locally, just open the HTML files in a browser, or serve the directory:

```bash
python3 -m http.server
```

## Deployment

Pushing to `main` deploys automatically via GitHub Pages. The `CNAME` file keeps the custom domain (`federicoatz.com`) configured — don't remove it.

## License

All content on this site — text, CV, photos, and page copy — is © Federico Atzori, all rights reserved. No license is granted for reuse of the personal content. If you'd like to reuse the site's HTML/CSS structure as a template, please ask first.
