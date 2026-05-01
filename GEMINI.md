# GEMINI.md — Automated QA Test Dashboard

## Project Notes for AI Agents

This project uses **Symbols/DOMQL v3** via the `smbls` CLI. Read this before making changes.

---

## ⚠️ Package Version Mismatch

The `package.json` originally listed `"smbls": "4.0.0"` which does NOT exist on npm. The installed global CLI is `3.8.9`. The fix is to use `"smbls": "*"` in `dependencies` and run:

```bash
npm install
npm install @supabase/supabase-js  # required optional dep bundled in smbls
```

---

## Correct State Access in Functions

When a function is called via `el.call('myFn')`, `this` is the DOMQL element. Use:

```js
// ✅ CORRECT
export const myFn = function myFn() {
  const rootState = this.getRoot().state
  rootState.update({ ... })
}

// ❌ WRONG — this.getState is not a function
export const myFn = function myFn() {
  const s = this.getState()  // TypeError
}
```

---

## Dynamic Theming MUST use isX Pattern

A `theme:` function is NOT supported. Use the `isX` / `.isX` pattern:

```js
// ✅ CORRECT
isPass: (el, s) => s.status === 'passed',
'.isPass': { theme: 'statusPass' },

// ❌ WRONG — dynamic theme function silently fails
theme: (el, s) => s.status === 'passed' ? 'statusPass' : 'statusFail',
```

---

## SVG Transform / Rotation

Applying `transform: 'rotate(90deg)'` directly to an `Icon` component (which renders an `<svg>` element) causes `Error: <svg> attribute transform: Expected ')'`. Workaround: wrap in a container div and apply CSS transform to the wrapper.

```js
// ✅ CORRECT
ChevronWrap: {
  transition: 'transform 0.2s ease',
  isExpanded: (el, s) => ...,
  '.isExpanded': { transform: 'rotate(90deg)' },
  ChevronIcon: { extends: 'Icon', icon: 'chevronRight' }
}

// ❌ WRONG — SVG attribute syntax error
ExpandIcon: {
  extends: 'Icon',
  transform: 'rotate(90deg)'  // applied as SVG attribute, not CSS
}
```

---

## Border Color Tokens

`borderBottom: '1px solid borderSubtle'` is invalid. `borderSubtle` is a design token, not a CSS color string. Use:

```js
// ✅ CORRECT
borderBottom: '1px solid',
borderColor: 'borderSubtle',

// ❌ WRONG
borderBottom: '1px solid borderSubtle',
```

---

## Prop vs State in childExtends

When using `extends: 'MyComponent'` and passing custom props like `count: 5`, those are accessible as DOMQL props, NOT `s.count`. Inside the extended component, access parent props via `el.parent.props.count`. 

The cleanest solution is to create specialized component variants that call shared functions themselves, rather than relying on prop passing through the extend chain.

---

## File Structure

- `symbols/state.js` — Global state (testRuns, filters, modal state)
- `symbols/functions/` — All business logic, exported via `index.js`
- `symbols/components/` — All UI components, exported via `index.js`
- `symbols/designSystem/` — Tokens: color.js, theme.js, icons.js, font_family.js
- `symbols/pages/` — Pages (main.js) + route registry (index.js)
