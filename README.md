# Automated QA Test Dashboardtest

A modern, high-performance dashboard for viewing, managing, and analyzing automated QA test results. Built with **Symbols/DOMQL v3**, this dashboard provides deep insights into your test execution suites, failure logs, and overall system stability.

## Features

- **Test Execution Grid**: Comprehensive view of test cases with their status (Passed, Failed, Blocked, Skipped), execution time, and flakiness metrics.
- **Expandable Rows**: Drill down into individual test steps and failure logs directly from the grid.
- **Metrics Overview Panel**: Real-time progress bars and aggregated statistics for the current test run.
- **Bulk Actions**: Select multiple tests to perform batch operations or apply status changes.
- **Log Viewer**: Dedicated modal for deeply inspecting error logs, stack traces, and assertion failures.
- **Dynamic Theming & Environment Filtering**: Easily switch between environments (e.g., Staging, UAT, Production) and run types (e.g., Smoke, Full Regression).

## Tech Stack

- **Framework**: [Symbols](https://symbols.app) / [DOMQL](https://github.com/domql/domql) (v3)
- **State Management**: Built-in reactive state handling (`symbols/state.js`)
- **Styling**: Symbols Design System tokens (`symbols/designSystem/`)
- **Tooling**: `@symbo.ls/cli` (smbls)

## Getting Started

### Prerequisites

- Node.js installed

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd automated-qa-test-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   npm install @supabase/supabase-js
   ```

### Tooling (Symbols CLI)

This project is built and run using the Symbols CLI (`smbls`). It is recommended to install the required global CLI version to run tooling commands directly:

```bash
npm install -g @symbo.ls/cli@3.8.9
```

### Development

Start the local development server (this executes `npx smbls start`):

```bash
npm start
```

Alternatively, if you have installed the CLI globally, you can run the tooling directly:
```bash
smbls start
```

### Build

Build the project for production (this executes `npx smbls build`):

```bash
npm run build
```

Alternatively, run the tooling directly:
```bash
smbls build
```

## Project Structure

- `symbols/state.js`: Global state definition (test runs, filters, modal state).
- `symbols/functions/`: Business logic, metric computation, and event handlers.
- `symbols/components/`: Reusable UI components (Test Grid, Metrics Panel, Modals, etc.).
- `symbols/designSystem/`: Design tokens, colors, themes, spacing, and typography.
- `symbols/pages/`: Main page assembly and routing.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
