# Publish Designed to Be Deleted

## 1. Create the repository

Create a GitHub repository named `designed-to-be-deleted`. Do not add a README, license, or `.gitignore` in GitHub because this project already contains them.

## 2. Set the public address

In `hugo.yaml`, replace:

```yaml
baseURL: "https://USERNAME.github.io/designed-to-be-deleted/"
```

with your GitHub username and repository name.

## 3. Upload the project

Upload the contents of this package to the repository’s `main` branch, or push the included Git repository to GitHub.

## 4. Enable GitHub Pages

In the GitHub repository:

1. Open **Settings**.
2. Select **Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Open the **Actions** tab and wait for **Deploy Hugo site to Pages** to finish.

The live address appears in the completed workflow and in **Settings → Pages**.

## 5. Connect Pages CMS

1. Open [Pages CMS](https://pagescms.org/) and sign in with GitHub.
2. Choose `designed-to-be-deleted`.
3. Open **Theses**.
4. Edit an entry and save it.

Pages CMS commits the edit to GitHub; the included GitHub Action automatically republishes the site.

## Optional custom domain

Add a `static/CNAME` file containing only your domain, then configure the same domain under **Settings → Pages → Custom domain**. Update `baseURL` in `hugo.yaml` to the full custom-domain URL.

