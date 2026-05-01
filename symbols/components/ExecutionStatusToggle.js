// ExecutionStatusToggle: atomic 4-state status button
// Pass → Fail → Blocked → Skipped → Pass cycle on click
// SC 4.1.2 — button with aria-label conveying current status + action
// SC 1.4.3 — status themes use sufficient contrast (checked in theme.js)
export const ExecutionStatusToggle = {
  tag: 'button',
  flow: 'x',
  align: 'center center',
  gap: 'Y',
  padding: 'Y Z',
  borderRadius: 'Y',
  cursor: 'pointer',
  fontSize: 'Y',
  fontWeight: '600',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  border: '1px solid transparent',
  transition: 'all 0.15s ease',
  userSelect: 'none',
  whiteSpace: 'nowrap',
  // SC 4.1.2 — describe current status and that click changes it
  ariaLabel: (el, s) => 'Status: ' + (s.status || 'untested') + '. Click to cycle status.',

  ':focus-visible': {
    outline: '2px solid blue',
    outlineOffset: '2px',
  },

  // Status conditional theming
  isPass: (el, s) => s.status === 'passed',
  '.isPass': {
    theme: 'statusPass',
  },
  isFail: (el, s) => s.status === 'failed',
  '.isFail': {
    theme: 'statusFail',
  },
  isBlocked: (el, s) => s.status === 'blocked',
  '.isBlocked': {
    theme: 'statusBlocked',
  },
  isSkipped: (el, s) => s.status === 'skipped' || s.status === 'untested',
  '.isSkipped': {
    theme: 'statusSkipped',
  },

  ':hover': {
    opacity: '0.85',
    transform: 'scale(1.02)',
  },
  ':active': {
    transform: 'scale(0.98)',
  },

  // SC 4.1.2 — icon is decorative, aria-label carries the accessible name
  StatusIcon: {
    extends: 'Icon',
    width: 'Z',
    height: 'Z',
    icon: (el, s) => el.call('getStatusIcon', s.status),
    ariaHidden: 'true',
  },

  StatusLabel: {
    text: (el, s) => el.call('getStatusLabel', s.status),
    ariaHidden: 'true',
  },

  onClick: (e, el, s) => {
    var cycle = { passed: 'failed', failed: 'blocked', blocked: 'skipped', skipped: 'passed', untested: 'passed' }
    var nextStatus = cycle[s.status] || 'passed'
    el.call('toggleTestStatus', s.id, nextStatus)
  },
}
