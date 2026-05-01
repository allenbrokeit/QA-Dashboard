// ExpandableTestGrid: high-density data table with bulk select + expandable rows
export const ExpandableTestGrid = {
  flow: 'y',
  borderRadius: 'Z',
  theme: 'card',
  overflow: 'hidden',
  // SC 1.3.1 — define landmark role for the grid region
  role: 'region',
  ariaLabel: 'Test Cases Grid',

  GridHeaderSection: {
    flow: 'x',
    align: 'center space-between',
    padding: 'Z A',
    borderBottom: '1px solid',
    borderColor: 'borderSubtle',
    flexWrap: 'wrap',
    gap: 'Z',

    GridTitle: {
      tag: 'h2',
      fontSize: 'Z',
      fontWeight: '700',
      color: 'title',
      text: 'Test Cases',
    },

    GridMeta: {
      fontSize: 'Y',
      color: 'caption',
      text: (el, s) => (s.root.testRuns || []).length + ' cases \xb7 ' + s.root.activeEnv + ' \xb7 ' + s.root.activeRunType,
    },
  },

  BulkBar: {
    extends: 'BulkActionBar',
    margin: 'Y A',
  },

  // Column headers
  GridColHeaders: {
    flow: 'x',
    align: 'center start',
    padding: 'Y A',
    background: 'gray.04',
    borderBottom: '1px solid',
    borderColor: 'borderSubtle',
    gap: '0',
    fontSize: 'Y',
    fontWeight: '600',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: 'disabled',

    HeaderCheckboxCell: {
      flex: '0 0 auto',
      width: 'B',
      flow: 'x',
      align: 'center center',

      SelectAllCheckbox: {
        tag: 'input',
        type: 'checkbox',
        cursor: 'pointer',
        width: 'Z',
        height: 'Z',
        accentColor: 'blue',
        // SC 1.3.1, 4.1.2 — label for checkbox
        ariaLabel: 'Select all test cases',
        checked: (el, s) => {
          var runs = s.root.testRuns || []
          var selected = s.root.selectedTestIds || []
          return runs.length > 0 && selected.length === runs.length
        },
        onClick: (e, el, s) => el.call('toggleSelectAll'),
      },
    },

    HeaderExpandCell: {
      flex: '0 0 auto',
      width: 'B',
    },

    HeaderIdCell: {
      flex: '0 0 auto',
      width: 'E',
      text: 'ID',
    },

    HeaderTitleCell: {
      flex: '1',
      text: 'Title',
    },

    HeaderSuiteCell: {
      flex: '0 0 auto',
      width: 'F',
      text: 'Suite',
      '@tabletS': { display: 'none' },
    },

    HeaderStatusCell: {
      flex: '0 0 auto',
      width: 'G',
      text: 'Status',
    },

    HeaderTimeCell: {
      flex: '0 0 auto',
      width: 'E',
      text: 'Time',
      '@tabletS': { display: 'none' },
    },

    HeaderActionsCell: {
      flex: '0 0 auto',
      width: 'C',
      text: 'Log',
    },
  },

  // Data rows list
  // SC 1.3.1 — use role=rowgroup for the data body
  TestRowsList: {
    flow: 'y',
    gap: '0',
    children: (el, s) => s.root.testRuns || [],
    childExtends: 'TestGridRow',
    childrenAs: 'state',
  },
}

// Individual test row with expand/collapse
export const TestGridRow = {
  flow: 'y',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
  transition: 'background 0.15s ease',

  ':last-child': {
    borderBottom: 'none',
  },

  ':hover': {
    background: 'gray.04',
  },

  isSelected: (el, s) => (s.root.selectedTestIds || []).includes(s.id),
  '.isSelected': {
    background: 'blue.04',
    ':hover': {
      background: 'blue.06',
    },
  },

  // Main row content
  RowMain: {
    flow: 'x',
    align: 'center start',
    padding: 'Y A',
    gap: '0',
    cursor: 'default',

    RowCheckboxCell: {
      flex: '0 0 auto',
      width: 'B',
      flow: 'x',
      align: 'center center',

      RowCheckbox: {
        tag: 'input',
        type: 'checkbox',
        cursor: 'pointer',
        width: 'Z',
        height: 'Z',
        accentColor: 'blue',
        // SC 1.3.1, 4.1.2 — descriptive label per row
        ariaLabel: (el, s) => 'Select test case ' + s.id,
        checked: (el, s) => (s.root.selectedTestIds || []).includes(s.id),
        onClick: (e, el, s) => {
          e.stopPropagation()
          el.call('toggleSelectTest', s.id)
        },
      },
    },

    // SC 2.1.1 — use native button for keyboard access
    // SC 4.1.2 — aria-expanded + aria-label for screen readers
    ExpandToggleCell: {
      tag: 'button',
      flex: '0 0 auto',
      width: 'B',
      flow: 'x',
      align: 'center center',
      cursor: 'pointer',
      padding: 'Y',
      borderRadius: 'X',
      border: 'none',
      background: 'transparent',
      transition: 'all 0.15s ease',
      ariaLabel: (el, s) => 'Expand details for ' + s.id,
      ariaExpanded: (el, s) => (s.root.expandedTestIds || []).includes(s.id),
      ':hover': {
        background: 'gray.1',
      },
      ':focus-visible': {
        outline: '2px solid blue',
        outlineOffset: '2px',
      },

      ExpandChevronWrap: {
        width: 'Z',
        height: 'Z',
        transition: 'transform 0.2s ease',
        color: 'caption',
        // SC 4.1.2 — icon is decorative, button label carries the name
        ariaHidden: 'true',

        isExpanded: (el, s) => (s.root.expandedTestIds || []).includes(s.id),
        '.isExpanded': {
          transform: 'rotate(90deg)',
        },

        ExpandChevron: {
          extends: 'Icon',
          icon: 'chevronRight',
          width: '100%',
          height: '100%',
        },
      },

      onClick: (e, el, s) => {
        e.stopPropagation()
        el.call('toggleRowExpand', s.id)
      },
    },

    RowIdCell: {
      flex: '0 0 auto',
      width: 'E',
      fontSize: 'Y',
      fontWeight: '700',
      color: 'blue',
      fontFamily: '"JetBrains Mono", monospace',
      text: (el, s) => s.id,
    },

    RowTitleCell: {
      flex: '1',
      flow: 'y',
      gap: 'X',
      paddingRight: 'Z',

      RowTitle: {
        fontSize: 'Z',
        fontWeight: '500',
        color: 'title',
        text: (el, s) => s.title,
        lineHeight: '1.4',
      },

      FlakinessBadge: {
        if: (el, s) => (s.flakiness || 0) > 0,
        flow: 'x',
        align: 'center center',
        gap: 'X',
        display: 'inline-flex',

        FlakinessIcon: {
          extends: 'Icon',
          icon: 'alertTriangle',
          width: 'X',
          height: 'X',
          color: 'blockedAmber',
          // SC 4.1.2 — decorative icon, text carries meaning
          ariaHidden: 'true',
        },

        FlakinessText: {
          fontSize: 'Y',
          color: 'blockedAmber',
          fontWeight: '500',
          text: (el, s) => s.flakiness + '% flaky',
        },
      },
    },

    RowSuiteCell: {
      flex: '0 0 auto',
      width: 'F',
      '@tabletS': { display: 'none' },

      SuiteBadge: {
        padding: 'X Y',
        borderRadius: 'Y',
        background: 'blue.08',
        color: 'blue',
        fontSize: 'Y',
        fontWeight: '500',
        display: 'inline-block',
        text: (el, s) => s.suite,
      },
    },

    RowStatusCell: {
      flex: '0 0 auto',
      width: 'G',

      ToggleBtn: {
        extends: 'ExecutionStatusToggle',
        id: (el, s) => s.id,
        status: (el, s) => s.status,
      },
    },

    RowTimeCell: {
      flex: '0 0 auto',
      width: 'E',
      fontSize: 'Y',
      fontWeight: '500',
      color: 'caption',
      fontFamily: '"JetBrains Mono", monospace',
      '@tabletS': { display: 'none' },
      text: (el, s) => el.call('formatDuration', s.executionTimeMs),
    },

    RowActionsCell: {
      flex: '0 0 auto',
      width: 'C',
      flow: 'x',
      align: 'center center',

      // SC 4.1.2 — icon-only button MUST have aria-label
      // SC 2.1.1 — native button is keyboard accessible
      ViewLogBtn: {
        tag: 'button',
        padding: 'Y',
        borderRadius: 'Y',
        cursor: 'pointer',
        background: 'transparent',
        border: 'none',
        color: 'caption',
        transition: 'all 0.15s ease',
        // SC 4.1.2 — aria-label replaces icon-only problem (title is tooltip only, not accessible name on all AT)
        ariaLabel: (el, s) => 'View error log for ' + s.id,

        isFailedLog: (el, s) => s.status === 'failed' || s.status === 'blocked',
        '.isFailedLog': {
          color: 'failRed',
        },

        ':hover': {
          background: 'gray.1',
          color: 'title',
        },
        ':focus-visible': {
          outline: '2px solid blue',
          outlineOffset: '2px',
        },

        LogIcon: {
          extends: 'Icon',
          icon: 'logFile',
          width: 'Z',
          height: 'Z',
          // SC 4.1.2 — decorative, button label carries name
          ariaHidden: 'true',
        },

        onClick: (e, el, s) => {
          e.stopPropagation()
          el.call('openLogModal', s.id, s.errorMessage)
        },
      },
    },
  },

  // Expandable steps panel
  StepsPanel: {
    extends: 'TestStepsList',
    show: (el, s) => (s.root.expandedTestIds || []).includes(s.id),
    steps: (el, s) => s.steps,
    precondition: (el, s) => s.precondition,
  },
}
