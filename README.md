# ILI Table Panel

A minimal, React-based Grafana panel for displaying tabular data with **configurable font size** (including table content), designed for **ILI/KRITIS** environments.

## Features

- ✅ Grafana v11+ & v12+ compatible (React-only)
- ✅ Numeric `fontSize` option for table body (in px)
- ✅ Header toggle & word-wrap
- ✅ Minimal third-party deps (`@grafana/*`, `@emotion/css`)
- ✅ Audit-ready: fully self-hosted, no network calls

## Installation (development build)

This repo only contains the plugin source code (`src/`), not a build setup
(Webpack, ESLint, Jest config, etc.). The simplest and officially recommended
way to get one is to scaffold it with Grafana's own tool, then drop this
repo's `src/` folder into the generated project:

```bash
# Prerequisites: Node.js 20+ and npm or yarn

# 1. Generate the build scaffold (you'll be asked interactively for:
#    plugin type "Panel", plugin name "ILI Table", plugin ID "ili-table-panel")
npx @grafana/create-plugin@latest

# 2. Move into the generated project directory
cd ili-table-panel

# 3. Replace the scaffold's placeholder src/ and plugin.json with this repo's
rm -rf src
cp -r /path/to/ILI-Table-Panel-main/src ./src
cp /path/to/ILI-Table-Panel-main/plugin.json ./src/plugin.json

# 4. Install the extra dependency used by the dynamic styles
npm install @emotion/css
# or with yarn:
yarn add @emotion/css

# 5. Install dependencies and build in watch mode
npm install
npm run dev
# or with yarn:
yarn install
yarn dev
```

> Note: in scaffolded Grafana plugins, `plugin.json` usually lives under
> `src/plugin.json` (not at the project root). If your version of
> `create-plugin` produces a different layout, follow the path it prints.

## Production build

```bash
npm run build
# or
yarn build
```

The result will be in the `dist/` folder.

## Deploy to Grafana

```bash
sudo mkdir -p /var/lib/grafana/plugins/ili-table-panel
sudo cp -r dist/* /var/lib/grafana/plugins/ili-table-panel/
sudo chown -R grafana:grafana /var/lib/grafana/plugins/ili-table-panel
sudo systemctl restart grafana-server
```

If the plugin is unsigned (no official signing by Grafana Labs), it also
needs to be allow-listed in `grafana.ini`:

```ini
[plugins]
allow_loading_unsigned_plugins = ili-table-panel
```

Then restart Grafana — the panel should now show up as "ILI Table" in the
panel type picker.
