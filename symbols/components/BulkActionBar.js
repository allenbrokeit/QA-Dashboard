// BulkActionBar: floats above grid when tests are selected
export const BulkActionBar = {
  flow: 'x',
  align: 'center space-between',
  padding: 'Z A',
  borderRadius: 'Z',
  theme: 'dialog',
  border: '1px solid blue.3',
  boxShadow: 'blue.15 0 Y A Y',
  transition: 'all 0.2s ease',
  
  // SC 1.3.1 - Region landmark for bulk actions
  role: 'region',
  ariaLabel: 'Bulk Actions',

  if: (el, s) => (s.root.selectedTestIds || []).length > 0,

  SelectionInfo: {
    flow: 'x',
    align: 'center center',
    gap: 'Z',
    // SC 4.1.2 - Announce live selection changes
    ariaLive: 'polite',

    SelectedCount: {
      fontSize: 'Z',
      fontWeight: '700',
      color: 'blue',
      text: (el, s) => (s.root.selectedTestIds || []).length + ' selected',
    },

    ClearSelectionBtn: {
      tag: 'button',
      fontSize: 'Y',
      fontWeight: '500',
      color: 'caption',
      cursor: 'pointer',
      background: 'transparent',
      border: 'none',
      padding: 'X Y',
      borderRadius: 'X',
      text: 'Clear',
      ariaLabel: 'Clear selection',
      ':hover': { color: 'title' },
      ':focus-visible': {
        outline: '2px solid blue',
        outlineOffset: '2px',
      },
      onClick: (e, el, s) => s.root.update({ selectedTestIds: [] }),
    },
  },

  BulkActions: {
    flow: 'x',
    align: 'center center',
    gap: 'Y',

    BulkPassBtn: {
      tag: 'button',
      flow: 'x',
      align: 'center center',
      gap: 'X',
      padding: 'X Z',
      borderRadius: 'Y',
      cursor: 'pointer',
      fontSize: 'Y',
      fontWeight: '600',
      theme: 'statusPass',
      border: '1px solid transparent',
      transition: 'all 0.15s ease',
      ariaLabel: 'Mark selected tests as Passed',
      ':hover': { opacity: '0.85' },
      ':focus-visible': { outline: '2px solid blue', outlineOffset: '2px' },
      BulkPassIcon: { extends: 'Icon', icon: 'checkCircle', width: 'Z', height: 'Z', ariaHidden: 'true' },
      BulkPassLabel: { text: 'Pass All', ariaHidden: 'true' },
      onClick: (e, el, s) => {
        el.call('applyBulkStatus', 'passed')
      },
    },

    BulkFailBtn: {
      tag: 'button',
      flow: 'x',
      align: 'center center',
      gap: 'X',
      padding: 'X Z',
      borderRadius: 'Y',
      cursor: 'pointer',
      fontSize: 'Y',
      fontWeight: '600',
      theme: 'statusFail',
      border: '1px solid transparent',
      transition: 'all 0.15s ease',
      ariaLabel: 'Mark selected tests as Failed',
      ':hover': { opacity: '0.85' },
      ':focus-visible': { outline: '2px solid blue', outlineOffset: '2px' },
      BulkFailIcon: { extends: 'Icon', icon: 'xCircle', width: 'Z', height: 'Z', ariaHidden: 'true' },
      BulkFailLabel: { text: 'Fail All', ariaHidden: 'true' },
      onClick: (e, el, s) => {
        el.call('applyBulkStatus', 'failed')
      },
    },

    BulkBlockBtn: {
      tag: 'button',
      flow: 'x',
      align: 'center center',
      gap: 'X',
      padding: 'X Z',
      borderRadius: 'Y',
      cursor: 'pointer',
      fontSize: 'Y',
      fontWeight: '600',
      theme: 'statusBlocked',
      border: '1px solid transparent',
      transition: 'all 0.15s ease',
      ariaLabel: 'Mark selected tests as Blocked',
      ':hover': { opacity: '0.85' },
      ':focus-visible': { outline: '2px solid blue', outlineOffset: '2px' },
      BulkBlockIcon: { extends: 'Icon', icon: 'alertCircle', width: 'Z', height: 'Z', ariaHidden: 'true' },
      BulkBlockLabel: { text: 'Block All', ariaHidden: 'true' },
      onClick: (e, el, s) => {
        el.call('applyBulkStatus', 'blocked')
      },
    },

    BulkSkipBtn: {
      tag: 'button',
      flow: 'x',
      align: 'center center',
      gap: 'X',
      padding: 'X Z',
      borderRadius: 'Y',
      cursor: 'pointer',
      fontSize: 'Y',
      fontWeight: '600',
      theme: 'statusSkipped',
      border: '1px solid transparent',
      transition: 'all 0.15s ease',
      ariaLabel: 'Mark selected tests as Skipped',
      ':hover': { opacity: '0.85' },
      ':focus-visible': { outline: '2px solid blue', outlineOffset: '2px' },
      BulkSkipIcon: { extends: 'Icon', icon: 'minusCircle', width: 'Z', height: 'Z', ariaHidden: 'true' },
      BulkSkipLabel: { text: 'Skip All', ariaHidden: 'true' },
      onClick: (e, el, s) => {
        el.call('applyBulkStatus', 'skipped')
      },
    },
  },
}
