# ILI Table Panel

A minimal, React-based Grafana panel for displaying tabular data with **configurable font size** (including table content), designed for **ILI/KRITIS** environments.

## Features

- ✅ Grafana v11+ & v12+ compatible (React-only)
- ✅ `fontSize` for table body (e.g. `"12px"`, `"0.9rem"`, `"90%"`)
- ✅ Header toggle & word-wrap
- ✅ Zero third-party deps (only `@grafana/*`)
- ✅ Audit-ready: fully self-hosted, no network calls

## Installation

```bash
# Build locally (requires Node.js 20+ & yarn)
yarn install
yarn build

# Deploy to Grafana
sudo mkdir -p /var/lib/grafana/plugins/ili-table-panel
sudo cp -r dist/* /var/lib/grafana/plugins/ili-table-panel/
sudo chown -R grafana:grafana /var/lib/grafana/plugins/ili-table-panel
sudo systemctl restart grafana-server
