# Designed to Be Deleted

A responsive Hugo publication for a 31-part manifesto about dating as capitalism. The interface treats each thesis as a typographic “profile”: a number, a short proposition, and research traits.

The supplied manifesto and structured Framer CMS export have been imported into the 31 entries in `content/theses/`. A preserved copy of the long-form source is stored in `source/Designed_to_be_Deleted_Manifesto.md`.

## Run locally

1. Install [Hugo Extended](https://gohugo.io/installation/) version 0.128 or newer.
2. Run `hugo server`.
3. Open the local address printed by Hugo.

## Publish on GitHub Pages

1. Create a public GitHub repository, for example `designed-to-be-deleted`.
2. Update `baseURL` in `hugo.yaml` to `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`.
3. Push this project to the repository’s default branch.
4. In GitHub, open **Settings → Pages** and choose **GitHub Actions** as the source.
5. The included workflow builds and deploys automatically on every push to `main`.

If the repository is named `YOUR-USERNAME.github.io`, set `baseURL` to `https://YOUR-USERNAME.github.io/`.

## Edit with Pages CMS

1. Go to [Pages CMS](https://pagescms.org/) and sign in with GitHub.
2. Select the repository.
3. Open **Theses** to edit, reorder, draft, or add entries.
4. Commit changes in Pages CMS. GitHub Actions republishes the site automatically.

The CMS configuration is in `.pages.yml`. Each citation is a structured label, URL, and note; related theses are entered as two-digit thesis numbers.

## Content model

Each thesis contains:

- number, title, summary, and traits;
- full Markdown body;
- structured citations;
- related thesis numbers;
- draft status and SEO description.

## Design and accessibility

The site uses system fonts, strong contrast, visible focus states, a skip link, semantic landmarks, keyboard-accessible controls, reduced-motion support, and fluid layouts from small phones to wide screens.
