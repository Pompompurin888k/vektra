# React + TypeScript + Vite

# Vektra — NewTaste

Instant M-Pesa tips for creators. Bank payouts, tipping, admin console.

## Banks reference

The Kenyan bank list lives in `src/lib/banks.ts` and is used by the onboarding
bank picker and the admin channels console. Field semantics (`name`, `code`,
`channelId`), the editing rules, and the shared canonical contract with the
ChaiPoint API (`/api/banks`) are documented in the repo-root
**[`BANK_FIELDS.md`](../BANK_FIELDS.md)**.

Key rules:
- `code` is optional and **verified-only** — never guess a bank system code.
- `channelId` must stay unique here **and consistent with ChaiPoint** — `bun validate.ts`
  in the repo root cross-checks both lists (check 9).
- `assertBankIntegrity()` fails fast in dev on duplicate name/code/channel.

## React + TypeScript + Vite

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
