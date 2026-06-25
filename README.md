# Shopify Portfolio Themes

A pair of custom Shopify themes aimed at creatives — a **cinematic portfolio**
and a **filmmaker** theme — plus a standalone portfolio web build.

## Contents

```
theme/                     Shopify theme (Liquid)
  ├─ sections/  snippets/   modular, customizable blocks
  ├─ templates/ layout/     page templates & layout
  ├─ assets/    config/     styles, scripts, theme settings
  └─ locales/               translations
portfolio/                 Standalone Vite portfolio build
cinematic-portfolio.zip    Packaged cinematic theme
filmmaker-theme.zip        Packaged filmmaker theme
```

## Using the Shopify Theme

1. Zip the `theme/` folder (or use the provided `*.zip` packages).
2. In Shopify admin: **Online Store → Themes → Add theme → Upload zip file**.
3. Customize via **Theme editor** (sections & settings).

Or with the [Shopify CLI](https://shopify.dev/docs/themes/tools/cli):

```bash
cd theme
shopify theme dev      # live preview against your store
shopify theme push     # publish
```

## Standalone Portfolio (`portfolio/`)

```bash
cd portfolio
npm install
npm run dev
npm run build
```
