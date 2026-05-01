# Symbols / DOMQL v3 — Framework Feedback & Conventions Log

> **Project:** Automated QA Test Run Dashboard  
> **Framework:** Symbols / DOMQL v3 via `@symbo.ls/cli` (installed: v3.8.9)  
> **Status:** Living document — updated after every session  
> **Purpose:** Record correct v3 patterns, wrong patterns, confirmed bugs, and conflicting instructions found in the MCP tools and docs.

---

## Table of Contents

1. [DOMQL v3 Syntax — Confirmed Correct Patterns](#1-domql-v3-syntax--confirmed-correct-patterns)
2. [Event Handlers](#2-event-handlers)
3. [State Patterns](#3-state-patterns)
4. [Dynamic Children](#4-dynamic-children)
5. [Conditional Props — isX / .isX](#5-conditional-props--isx--isx)
6. [Design System Token Usage](#6-design-system-token-usage)
7. [SVG / Icon Rules](#7-svg--icon-rules)
8. [Atoms & Shorthand Props](#8-atoms--shorthand-props)
9. [Accessibility (ARIA)](#9-accessibility-aria)
10. [Functions & el.call()](#10-functions--elcall)
11. [Component Structure Rules](#11-component-structure-rules)
12. [Verified Runtime Bugs](#12-verified-runtime-bugs)
13. [Conflicting Instructions Found in MCP Docs](#13-conflicting-instructions-found-in-mcp-docs)
14. [V3 Verification Checklist](#14-v3-verification-checklist)
15. [Character & Token Count](#15-character--token-count)

---

## 1. DOMQL v3 Syntax — Confirmed Correct Patterns

### v2 → v3 Migration Table

| v3 — USE THIS | v2 — NEVER USE |
|---|---|
| `extends: 'Component'` | `extend: 'Component'` |
| `childExtends: 'Component'` | `childExtend: 'Component'` |
| `onClick: fn` (top-level) | `on: { click: fn }` |
| `onRender: fn` (top-level) | `on: { render: fn }` |
| `children` + `childExtends` | `$collection` |
| `children` + `childrenAs: 'state'` | `$stateCollection` |
| `color: {}` (lowercase) | `COLOR: {}` (UPPERCASE) |
| props flattened at root level | `props: { padding: 'A' }` wrapper |

### Component Declaration

```js
// CORRECT — component is a plain object
export const MyWidget = {
  flow: 'y',
  gap: 'A',
  padding: 'B',
}

// WRONG — component as function
export const MyWidget = (el, state) => ({ padding: 'A' })
```

---

## 2. Event Handlers

Event handlers in v3 are top-level keys on the component object.

### Signatures

| Handler | Signature |
|---|---|
| `onClick` | `(event, el, state) => {}` |
| `onRender` | `(el, state) => {}` |
| `onInput` | `(event, el, state) => {}` |
| `onChange` | `(event, el, state) => {}` |
| `onBlur` | `(event, el, state) => {}` |
| `onKeydown` | `(event, el, state) => {}` |
| `onInit` | `(el) => {}` |

### Examples

```js
// Button click — stop propagation + call function
onClick: (e, el, s) => {
  e.stopPropagation()
  el.call('toggleRowExpand', s.id)
},

// Input handler
onInput: (e, el, s) => s.update({ filterQuery: e.target.value.toLowerCase().trim() }),

// onRender guard pattern (prevent double init)
onRender: (el) => {
  if (el.__initialized) return
  el.__initialized = true
},
```

> **Note:** `el.call('fn', args)` — the element (`this`) is passed implicitly. Do NOT pass `el` as the first arg:
> `el.call('myFn', someArg)` CORRECT | `el.call('myFn', el, someArg)` WRONG

---

## 3. State Patterns

### Three Contexts for State Access

| Context | Correct Pattern | Wrong Pattern |
|---|---|---|
| Event handler in component | `s.update({...})` | `s.count = x` (no re-render) |
| Root state from event handler | `s.root.update({...})` | N/A |
| Function called via `el.call()` | `this.getRoot().state.update({...})` | `this.getState()` (TypeError) |
| Child in `childrenAs: 'state'` list | `s.fieldName` directly | `el.parent.state.fieldName` |

### Root State in Event Handlers

```js
// In components — s.root is the root state
onClick: (e, el, s) => s.root.update({ activeView: 'home' }),

// Reading root state in props
show: (el, s) => s.root.activeView === 'home',
text: (el, s) => (s.root.testRuns || []).length + ' cases',
```

### Root State in functions/ Files

```js
// CORRECT — this is the DOMQL element; getRoot() traverses to root
export const myFn = function myFn(arg) {
  const rootState = this.getRoot().state
  rootState.update({ ... })
}

// BUG — this.getState is not a function at runtime
export const myFn = function myFn() {
  const s = this.getState()  // TypeError: this.getState is not a function
}
```

### State Update — Never Mutate Directly

```js
// Reactive update
s.update({ count: s.count + 1 })

// Direct mutation — no re-render (WRONG)
s.count = s.count + 1
```

---

## 4. Dynamic Children

`children` + `childExtends` + `childrenAs` is the v3 pattern for dynamic lists.

```js
// Dynamic list from root state
TestRowsList: {
  flow: 'y',
  gap: '0',
  children: (el, s) => s.root.testRuns || [],
  childExtends: 'TestGridRow',
  childrenAs: 'state',
},
```

- `childrenAs: 'state'` — each child receives its data slice as `s` directly
- `childrenAs: 'props'` — each child receives its data as props
- Each child inherits state at any depth (no need to traverse via `el.parent.state`)
- `childExtends` must be a quoted string name — NOT a variable or inline object

```js
// CORRECT
childExtends: 'TestGridRow'

// WRONG — direct variable (requires import, breaks serialization)
childExtends: TestGridRow

// WRONG — inline object
childExtends: { flow: 'x', gap: 'A' }
```

### childProps for Additional Shared Props

```js
Nav: {
  children: ['Home', 'About'],
  childrenAs: 'state',
  childExtends: 'Link',
  childProps: {
    text: '{{ value }}',
    href: (el, s) => '/' + s.value.toLowerCase(),
  },
}
```

---

## 5. Conditional Props — isX / .isX

Use `isX` + `'.isX'` when two or more properties share the same condition. Never repeat the same condition across multiple prop functions.

```js
// CORRECT — multiple properties, one condition
RunStatusBadge: {
  isHealthy: (el, s) => el.call('computeMetrics').passRate >= 80,
  '.isHealthy': { theme: 'statusPass' },

  isDegraded: (el, s) => {
    var m = el.call('computeMetrics')
    return m.passRate >= 50 && m.passRate < 80
  },
  '.isDegraded': { theme: 'statusBlocked' },
},

// WRONG — repeated condition
RunStatusBadge: {
  background: (el, s) => el.call('computeMetrics').passRate >= 80 ? 'passGreen' : 'failRed',
  color: (el, s) => el.call('computeMetrics').passRate >= 80 ? 'white' : 'black',
},
```

### isX vs if: vs show: / hide:

| Pattern | DOM Behavior | When to Use |
|---|---|---|
| `isX` + `'.isX'` | Inline style class swap | Conditional styling on same element |
| `if: (el, s) => bool` | Removes/creates element | Modal presence, conditional content |
| `show: (el, s) => bool` | display:none (keeps in DOM) | Tabs, panels you toggle often |
| `hide: (el, s) => bool` | Inverse of show: | When logic is inverted |

**CONFIRMED BUG: `theme:` as a function silently fails**

```js
// SILENTLY FAILS — dynamic theme function not supported
theme: (el, s) => s.status === 'passed' ? 'statusPass' : 'statusFail',

// CORRECT
isPass: (el, s) => s.status === 'passed',
'.isPass': { theme: 'statusPass' },
isFail: (el, s) => s.status === 'failed',
'.isFail': { theme: 'statusFail' },
```

---

## 6. Design System Token Usage

### Spacing Tokens

Tokens are em-based relative to the element's `fontSize`. Elements in the same layout row must share the same `fontSize` to pixel-align.

| Token | ~px (base 16) |
|---|---|
| `X` | 3px |
| `Y` | 6px |
| `Z` | 10px |
| `A` | 16px |
| `B` | 26px |
| `C` | 42px |
| `D` | 67px |
| `E` | 109px |
| `F` | 177px |

Sub-tokens: `Z1`, `Z2`, `A1`, `A2`, `B1`, `B2`, `C1`, `C2` (in-between sizes).

```js
// CORRECT token usage
padding: 'A B',
fontSize: 'Z',
borderRadius: 'Y',
gap: 'X',

// WRONG — raw px values
padding: '16px 26px',
fontSize: '10px',
```

### Border Token Pattern

Border color must be specified separately — design tokens cannot be embedded in CSS shorthand strings.

```js
// CORRECT
borderBottom: '1px solid',
borderColor: 'borderSubtle',

// WRONG — 'borderSubtle' is a design token, not a CSS color string
borderBottom: '1px solid borderSubtle',
```

### Color Token Syntax

```js
// Correct dot-notation for opacity
color: 'white.7'         // 70% opacity
background: 'black.5'   // 50% opacity
background: 'passGreen.08'   // 8% opacity (tint background)

// Tone modifiers
color: 'gray+16'         // lighten +16
color: 'blue=90'         // absolute lightness 90%

// OLD/WRONG syntax
color: 'white .7'
```

### Design System Key Naming — All Lowercase

```js
// CORRECT
export default { color, theme, font_family, icons }

// BANNED (deprecated)
export default { COLOR, THEME, FONT_FAMILY, ICONS }
```

---

## 7. SVG / Icon Rules

### Icon Component

```js
// CORRECT — Icon component with icon prop
SomeIcon: { extends: 'Icon', icon: 'chevronRight', width: 'Z', height: 'Z' }

// WRONG — incorrect prop name variants
{ extends: 'Icon', iconName: 'user' }      // wrong prop name
{ extends: 'Icon', name: 'user' }          // wrong prop name
{ extends: 'Icon', props: { name: 'user' } }  // wrong structure
```

### SVG Rotation Bug — CSS transform on SVG element

Applying `transform: 'rotate(90deg)'` directly to an `Icon` component causes:
```
Error: <svg> attribute transform: Expected ')'
```

SVG attributes use `rotate(90)` not `rotate(90deg)`. Workaround: wrap Icon in a container div, apply CSS transform to the wrapper.

```js
// CORRECT — transform on wrapper div
ChevronWrap: {
  width: 'Z',
  height: 'Z',
  transition: 'transform 0.2s ease',
  isExpanded: (el, s) => (s.root.expandedTestIds || []).includes(s.id),
  '.isExpanded': { transform: 'rotate(90deg)' },
  ExpandChevron: {
    extends: 'Icon',
    icon: 'chevronRight',
    width: '100%',
    height: '100%',
  },
},

// WRONG — transform directly on Icon (SVG element)
ExpandChevron: {
  extends: 'Icon',
  icon: 'chevronRight',
  transform: 'rotate(90deg)',  // parsed as SVG attribute
},
```

### designSystem/icons.js Format

All SVG icons must have `width="24" height="24"` and matching `viewBox="0 0 24 24"`. The Icon component handles display sizing.

```js
export default {
  chevronRight: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>',
}
```

---

## 8. Atoms & Shorthand Props

### Do NOT extend Text, Box, or Flex

Every element is already a Box. Elements with `text:` automatically behave as Text. Elements with `flow:` already behave as Flex.

```js
// CORRECT — use flow: directly
Row: { flow: 'x', gap: 'A', align: 'center space-between' }
Stack: { flow: 'y', gap: 'B', padding: 'C' }

// WRONG — unnecessary extends
Row: { extends: 'Flex', gap: 'A' }
Stack: { extends: 'Box', padding: 'C' }
```

**Warning:** When removing `extends: 'Flex'` you MUST add `flow: 'x'` or `flow: 'y'` — removing it without replacing causes a block div layout break.

### Shorthand Alignment

```js
// v3 shorthand
align: 'center space-between'   // align-items center, justify-content space-between
flow: 'x'                        // flex-direction: row
flow: 'y'                        // flex-direction: column

// DEPRECATED
flexAlign: 'center center'
```

### Auto-extend via PascalCase Keys

PascalCase child keys auto-extend registered components of the same name. Use distinctive names to avoid unintended auto-extension.

```js
// Risk — 'Header', 'Body', 'Row' may auto-extend default library components
Header: { flow: 'x' }  // may inherit unexpected spacing from default Header

// Safer — distinctive names
GridHeaderRow: { flow: 'x' }
PanelHeaderRow: { flow: 'x' }
```

---

## 9. Accessibility (ARIA)

### Correct ARIA Placement

```js
// Standard HTML attributes at root (always correct)
role: 'button',
tabindex: '0',

// ARIA via camelCase at root (Rule 14 — works, preferred)
ariaLabel: (el, s) => s.label,
ariaExpanded: (el, s) => s.isOpen,

// ARIA via shorthand object at root (Rule 14)
aria: { label: 'Main navigation', expanded: true },

// ARIA via explicit attr block (Rule 22 — also valid)
attr: {
  'aria-label': ({ props }) => props.label,
  'aria-busy': ({ state }) => state.loading,
}
```

See [Conflict #2](#conflict-2--aria-attribute-placement-rules-14-vs-rule-22) — Rules 14 and 22 give different guidance on ARIA placement.

### Native Elements Over Role Overrides

```js
// CORRECT — native button
ActionBtn: { tag: 'button', text: 'Submit' }

// AVOID — role override on div
ActionBtn: { role: 'button', text: 'Submit' }
```

---

## 10. Functions & el.call()

### Function File Structure

```js
// functions/myFn.js
export const myFn = function myFn(arg1) {
  // 'this' is the DOMQL element that called el.call('myFn')
  const rootState = this.getRoot().state
  rootState.update({ key: arg1 })
}

// functions/index.js
export * from './myFn.js'
```

### Calling Pattern

```js
// Call with args
onClick: (e, el, s) => el.call('toggleRowExpand', s.id),

// Call in prop function
text: (el, s) => el.call('computeMetrics').passed + ' passed',

// WRONG — do NOT pass el as first arg (el is implicit via 'this')
onClick: (e, el) => el.call('myFn', el, someArg),
```

### Scope for Closures

```js
// Use el.scope for non-reactive local values (timer IDs, debounce, etc.)
onInit: (el) => { el.scope.debounceTimer = null },
onInput: (e, el, s) => {
  clearTimeout(el.scope.debounceTimer)
  el.scope.debounceTimer = setTimeout(() => s.update({ q: e.target.value }), 200)
}
```

### Serialization Safety

```js
// WRONG — module-level variable lost after serialization
const STATUS_CYCLE = ['passed', 'failed', 'blocked', 'skipped']
export const MyComponent = {
  text: (el, s) => STATUS_CYCLE[s.statusIdx]  // undefined at runtime
}

// CORRECT — define inside function or in functions/ file
export const getNextStatus = function getNextStatus(current) {
  var cycle = ['passed', 'failed', 'blocked', 'skipped']
  var idx = cycle.indexOf(current)
  return cycle[(idx + 1) % cycle.length]
}
```

---

## 11. Component Structure Rules

### File & Export Rules

| Rule | Correct | Wrong |
|---|---|---|
| Index re-exports | `export * from './Foo.js'` | `export * as Foo from './Foo.js'` |
| No imports between files | Reference by string name | `import { Foo } from './Foo.js'` |
| Only exception | `pages/index.js` route map | Any other component file |
| Flat folder structure | `components/Foo.js` | `components/nav/Foo.js` |
| All DS keys lowercase | `color`, `theme`, `icons` | `COLOR`, `THEME`, `ICONS` |

### Page Declaration

```js
// CORRECT — pages must extend 'Page'
export const main = { extends: 'Page', DashboardLayout: {} }

// WRONG — wrong base for pages
export const main = { extends: 'Flex', ... }
```

### extends Must Be a Quoted String

```js
// CORRECT
ToggleBtn: { extends: 'ExecutionStatusToggle' }

// WRONG — variable requires import, breaks serialization
ToggleBtn: { extends: ExecutionStatusToggle }

// WRONG — inline object
ToggleBtn: { extends: { flow: 'x', padding: 'A' } }
```

### CSS Media Queries and Pseudo-classes — No Chaining

```js
// CORRECT — nested
Button: {
  '@dark': {
    ':hover': { background: 'blue' },
  },
}

// WRONG — chained string
Button: {
  '@dark :hover': { background: 'blue' },
}
```

---

## 12. Verified Runtime Bugs

### Bug #1 — `this.getState is not a function`

**Severity:** Critical — causes TypeError, function aborts silently
**Context:** Inside `functions/*.js` files called via `el.call('fnName')`
**Cause:** DOMQL elements do not expose a `.getState()` method

```js
// BUG — throws TypeError at runtime
export const myFn = function myFn() {
  const s = this.getState()  // TypeError: this.getState is not a function
}

// FIX
export const myFn = function myFn() {
  const rootState = this.getRoot().state
  rootState.update({ ... })
}
```

---

### Bug #2 — SVG transform Attribute Syntax Error

**Severity:** Critical — throws browser error, icon fails to render
**Context:** `transform: 'rotate(90deg)'` on an `Icon` element (which renders SVG)
**Fix:** Wrap Icon in a container div, apply CSS transform to the wrapper.

---

### Bug #3 — Design Token in CSS Shorthand String

**Severity:** Visual bug — border renders incorrectly or not at all
**Context:** `borderBottom: '1px solid borderSubtle'`

```js
// ✅ CORRECT — Use valid standard color identifiers
borderBottom: '1px solid',
borderColor: 'borderSubtle',
```

### ❌ Opacity Modifiers (.08, .15) on Array Tokens Disappear

If you define a token as a dynamic `[light, dark]` array in `color.js`, attempting to use `.08` or `.15` opacity suffixes on it will fail to compile cleanly to CSS because DOMQL tries to append `.08` to the stringified array instead of the resolved token. The elements will silently render with a transparent/missing background.

**Solution:** Only use opacity dot modifiers on STRING-based color tokens! If you need a color to pass WCAG on both dark and light themes *and* support opacity modifiers seamlessly, you must define the color mathematically as a string in `color.js` (e.g. choose a green with luminance ~0.18 which passes 4.5:1 on both `#171717` and `#ffffff`) so you can freely use `.08`/`.15` in your components.

```javascript
// ✅ CORRECT — Mathematical string definition passes WCAG on both themes, and supports opacity modifiers
import { passGreen } from 'color.js' // passGreen: '#1b993b'

PassStat: {
  background: 'passGreen.08',
  border: '1px solid passGreen.15',
}

// ❌ WRONG — Array tokens evaluating with dot opacity throw invalid CSS
import { passGreen } from 'color.js' // passGreen: ['#16a34a', '#4ade80']

PassStat: {
  background: 'passGreen.08', // Breaks silently
}
```

---

## 7. SVG / Icon Rules— Dynamic `theme:` Function Silently Fails

**Severity:** Silent failure — no error, wrong visual output
**Context:** `theme: (el, s) => 'statusPass'`
**Cause:** The theme system does not support function values for `theme:`
**Fix:** Use `isX` + `'.isX'` pattern

---

### Bug #5 — Props Passed via `extends` Not Accessible as `s.propName`

**Severity:** Silent data failure — child shows 0 or undefined
**Context:** `{ extends: 'MetricProgressBar', count: (el, s) => el.call('computeMetrics').passed }`
**Cause:** Values passed alongside `extends` become DOMQL props, not child state. `s.count` is undefined inside the extended component.

**Fix:** Create specialized concrete variants that compute values internally:

```js
// WRONG — s.count is undefined inside MetricProgressBar
PassBar: { extends: 'MetricProgressBar', count: (el, s) => el.call('computeMetrics').passed }

// CORRECT — specialized component that calls metrics directly
export const PassProgressBar = {
  MetricBarCount: {
    text: (el, s) => '' + el.call('computeMetrics').passed,
  },
}
```

---

## 13. Conflicting Instructions Found in MCP Docs

### Conflict #1 — `this.getState()` Documented but Not a Real API

**Source A (Rules doc, RUNNING_APPS.md filter snippet):** Shows `const s = this.getState()` in an example comment.

**Source B (Runtime behavior):** `this.getState` is not a function — throws TypeError.

**Source C (DOMQL traversal reference table, Rule 40):** Lists `el.getRootState()` as a valid traversal method — also unverified.

**Verdict:**
- `this.getState()` — NOT a real API, do NOT use
- `this.getRoot().state` — confirmed working
- `el.getRootState()` — listed in docs but unverified in this project
- In event handlers use `s.root.update(...)` — fully confirmed working

---

### Conflict #2 — ARIA Attribute Placement (Rules 14 vs Rule 22)

**Rule 14 says:** ARIA attributes work at root level as camelCase (`ariaLabel: 'foo'`) or shorthand objects (`aria: { label: 'foo' }`). The `attrs-in-props` module auto-detects and converts them.

**Rule 22 says:** Standard attrs at root. ARIA goes in `attr: {}`. Example: `attr: { 'aria-label': ({ props }) => props.label }`.

**Conflict:** Rule 14 permits ARIA at root; Rule 22 says ARIA belongs in `attr: {}`. Both are documented in the same official rules document.

**Verdict:** Both appear to work. Rule 14 (camelCase at root) is simpler and preferred. Use `attr: {}` only for truly custom attributes not auto-detected. The rules internally contradict their own recommendation.

---

### Conflict #3 — Component-Level `s` vs `s.root` Semantics

**Rule 7 documentation shows:** `s.update({ count: s.count + 1 })` — implying `s` is global state.

**Also Rule 7:** `Root-level global state: s.root.update({ key: val })` — suggesting `s` is local, `s.root` is global.

**Actual behavior:** When inside a `childrenAs: 'state'` child, `s` is the child's data slice. `s.root` is always the app root. At the page root level (no `childrenAs` parent), `s` IS the root state.

**Recommendation:** Always use `s.root.update({...})` for global state mutations to be context-independent.

---

### Conflict #4 — When to Use `isX` Pattern

**Rule 19 states:** Use `isX` when "two or more properties share the same condition." Single-property dynamic functions are fine.

**Rule 19 also states:** Single-condition-repeated-across-multiple-props shown as the anti-pattern.

**Many examples throughout docs:** Show single-property dynamic functions like `color: (el, s) => condition ? 'passGreen' : 'failRed'` — used extensively.

**Verdict:** No true conflict — single-property functions are valid. `isX` is only required for 2+ properties sharing a condition. But the pattern is also generally cleaner even for single properties when the condition is complex.

---

### Conflict #5 — Template Literals in Serialized Functions

**Rule 33 context:** Module-level closures and variables are lost after serialization. Functions stored as strings.

**Risk:** Template literals inside prop functions should survive serialization (they're inside the function string). But complex expressions with backticks may degrade on some platform builds.

**Observed behavior:** Template literals work in local dev. Mixed results when pushing to platform.

**Recommendation:** Use string concatenation for safety:

```js
// Safer
text: (el, s) => el.call('computeMetrics').total + ' tests total',

// Risky on some platform builds
text: (el, s) => `${el.call('computeMetrics').total} tests total`,
```

---

## 14. V3 Verification Checklist

Use this checklist to audit any component file for v3 compliance:

- [ ] Components defined as plain objects (not functions)
- [ ] `extends:` and `childExtends:` use quoted string names only
- [ ] No imports between component/function files (except `pages/index.js`)
- [ ] `components/index.js` uses `export *` (not `export * as`)
- [ ] Event handlers at root level (`onClick:`, not `on: { click: }`)
- [ ] State updates via `s.update()` / `s.root.update()` — no direct mutation
- [ ] Functions in `functions/` use `this.getRoot().state` (not `this.getState()`)
- [ ] `theme:` is never a function — use `isX` + `'.isX'` pattern
- [ ] SVG transforms on wrapper divs, not on `Icon` elements
- [ ] Borders use `borderBottom: '1px solid'` + `borderColor: 'token'` pattern
- [ ] All design system keys lowercase (`color`, `theme`, not `COLOR`, `THEME`)
- [ ] No raw px values — all spacing uses tokens (`A`, `B`, `Z`, etc.)
- [ ] Dynamic children use `children` + `childExtends` + `childrenAs` (not `$collection`)
- [ ] No `extends: 'Flex'` / `'Box'` / `'Text'` — use `flow:` / `align:` / `text:` directly
- [ ] Pages extend `'Page'` not `'Flex'`
- [ ] Icons use `extends: 'Icon'` with `icon: 'iconName'` prop
- [ ] All icons stored in `designSystem/icons.js` with `width="24" height="24"`
- [ ] No `document.getElementById`, `querySelector`, `innerHTML`, `style.x =` etc.
- [ ] No `window.location` — use `el.router()` for navigation
- [ ] No chained selectors: `'@dark :hover'` — use nested objects instead

---

## 15. Character & Token Count

> Tracks cumulative characters for all prompts and generated code in this conversation.
> Approximation: 1 token = 4 characters (OpenAI/Anthropic average for English + code).

---

### Running Subtotals by Session

#### Session 1 (2026-04-07 / 2026-04-08)

| Category | Characters |
|---|---|
| Prompt input (user) | ~8,200 |
| Generated code + docs (AI) | ~124,000 |

#### Session 3 (2026-04-08 — Accessibility Remediation)

| Category | Characters |
|---|---|
| Prompt input (user) | ~2,100 |
| Generated code + docs (AI) | ~29,000 |

---

### Cumulative Totals

| Category | Cumulative Characters | Estimated Tokens |
|---|---|---|
| Prompt (user input) | 12,100 | ~3,025 |
| Generated code & responses | 177,400 | ~44,350 |

### Session 4 (2026-04-08 — Contrast Fixes & Token Arrays)

| Category | Characters |
|---|---|
| Prompt input (user) | ~150 |
| Generated code + docs (AI) | ~5,000 |

**Cumulative Total Estimated Combined Tokens**: ~47,375 tokens

---

### Token Count Methodology

**Prompt characters include:**
- All user request text typed into the chat
- Conversation metadata passed per request
- Artifact approval messages

**Generated code characters include:**
- All `.js` component, function, and design system files
- Documentation files (GEMINI.md, symbols-feedback.md, walkthrough.md)
- MCP tool calls and their responses used in code decisions
- Bug fixes and rewrites

---

*Last updated: 2026-04-08 — Session 3 complete*
