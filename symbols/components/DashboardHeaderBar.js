// DashboardHeaderBar: top bar with run info + environment/run type filters
// SC 4.1.2 — header landmark, labelled nav groups
// SC 1.4.3 — fix border token usage (was 'borderSubtle' inline in shorthand)
export const DashboardHeaderBar = {
  tag: 'header',
  flow: 'x',
  align: 'center space-between',
  padding: 'Z B',
  // FIXED: borderSubtle token cannot be in CSS shorthand string (GEMINI.md bug)
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
  flexShrink: '0',
  flexWrap: 'wrap',
  gap: 'Z',
  // SC 2.4.1 — skip to main content via landmark, ariaLabel identifies header
  ariaLabel: 'QA Dashboard header',

  background: 'surfaceAlt',

  HeaderLeft: {
    flow: 'x',
    align: 'center center',
    gap: 'A',

    LogoArea: {
      flow: 'x',
      align: 'center center',
      gap: 'Y',

      LogoIcon: {
        extends: 'Icon',
        icon: 'layers',
        width: 'A',
        height: 'A',
        color: 'blue',
        // SC 4.1.2 — decorative logo icon
        ariaHidden: 'true',
      },

      AppTitle: {
        tag: 'h1',
        fontSize: 'Z',
        fontWeight: '800',
        letterSpacing: '-0.02em',
        color: 'title',
        text: 'QA Dashboard',
      },
    },

    RunIdBadge: {
      padding: 'X Z',
      borderRadius: 'Y',
      background: 'blue.1',
      border: '1px solid blue.2',
      fontSize: 'Y',
      fontWeight: '600',
      fontFamily: '"JetBrains Mono", monospace',
      color: 'blue',
      text: 'RUN-2024-APR-08',
      // SC 1.3.1 — convey role semantically
      role: 'status',
      ariaLabel: 'Current run ID: RUN-2024-APR-08',
    },
  },

  HeaderRight: {
    flow: 'x',
    align: 'center center',
    gap: 'Z',
    flexWrap: 'wrap',

    // SC 2.4.6 — labelled nav group for environment filters
    EnvFilterGroup: {
      flow: 'x',
      align: 'center center',
      gap: 'X',
      role: 'group',
      ariaLabel: 'Filter by environment',

      FilterLabel: {
        fontSize: 'Y',
        fontWeight: '500',
        color: 'caption',
        text: 'Env:',
        // Hidden from AT — group ariaLabel is sufficient
        ariaHidden: 'true',
      },

      EnvButtonList: {
        flow: 'x',
        align: 'center center',
        gap: 'X',
        padding: 'X',
        borderRadius: 'Z',
        background: 'gray.06',
        border: '1px solid',
        borderColor: 'borderSubtle',
        children: (el, s) => s.root.environments || [],
        childExtends: 'EnvFilterBtn',
        childrenAs: 'state',
      },
    },

    Divider: {
      width: '1px',
      height: 'A',
      background: 'borderSubtle',
      // SC 1.3.1 — decorative separator
      ariaHidden: 'true',
    },

    // SC 2.4.6 — labelled nav group for run type filters
    RunTypeFilterGroup: {
      flow: 'x',
      align: 'center center',
      gap: 'X',
      role: 'group',
      ariaLabel: 'Filter by run type',

      RunTypeLabel: {
        fontSize: 'Y',
        fontWeight: '500',
        color: 'caption',
        text: 'Run:',
        ariaHidden: 'true',
      },

      RunTypeList: {
        flow: 'x',
        align: 'center center',
        gap: 'X',
        padding: 'X',
        borderRadius: 'Z',
        background: 'gray.06',
        border: '1px solid',
        borderColor: 'borderSubtle',
        children: (el, s) => (s.root.runTypes || []).map(rt => ({ name: rt })),
        childExtends: 'RunTypeFilterBtn',
        childrenAs: 'state',
      },
    },

    RefreshBtn: {
      tag: 'button',
      flow: 'x',
      align: 'center center',
      gap: 'X',
      padding: 'X Z',
      borderRadius: 'Y',
      cursor: 'pointer',
      border: '1px solid',
      borderColor: 'borderSubtle',
      fontSize: 'Y',
      fontWeight: '500',
      color: 'caption',
      background: 'transparent',
      transition: 'all 0.15s ease',
      ariaLabel: 'Refresh dashboard data',
      ':hover': {
        borderColor: 'blue',
        color: 'blue',
      },
      ':focus-visible': {
        outline: '2px solid blue',
        outlineOffset: '2px',
      },

      RefreshIcon: {
        extends: 'Icon',
        icon: 'refresh',
        width: 'Z',
        height: 'Z',
        ariaHidden: 'true',
      },

      RefreshLabel: {
        text: 'Refresh',
      },

      onClick: (e, el, s) => {
        s.root.update({ isLoading: true })
        setTimeout(() => {
          s.root.update({ isLoading: false })
        }, 800)
      },
    },
  },
}

// Environment filter button
// SC 4.1.2 — aria-pressed conveys toggled state for toggle buttons
export const EnvFilterBtn = {
  tag: 'button',
  padding: 'X Y',
  borderRadius: 'Y',
  cursor: 'pointer',
  fontSize: 'Y',
  fontWeight: '600',
  border: 'none',
  transition: 'all 0.15s ease',
  text: (el, s) => s.name,
  // SC 4.1.2 — aria-pressed communicates toggled state
  ariaPressed: (el, s) => s.root.activeEnv === s.name,

  ':focus-visible': {
    outline: '2px solid blue',
    outlineOffset: '2px',
  },

  isActive: (el, s) => s.root.activeEnv === s.name,
  '.isActive': {
    background: 'blue',
    color: 'white',
  },
  '.!isActive': {
    background: 'transparent',
    color: 'caption',
    ':hover': {
      color: 'title',
      background: 'gray.1',
    },
  },

  onClick: (e, el, s) => {
    s.root.update({ activeEnv: s.name })
  },
}

// Run type filter button
// SC 4.1.2 — aria-pressed conveys toggled state
export const RunTypeFilterBtn = {
  tag: 'button',
  padding: 'X Y',
  borderRadius: 'Y',
  cursor: 'pointer',
  fontSize: 'Y',
  fontWeight: '600',
  border: 'none',
  transition: 'all 0.15s ease',
  text: (el, s) => s.name,
  // SC 4.1.2 — aria-pressed communicates toggled state
  ariaPressed: (el, s) => s.root.activeRunType === s.name,

  ':focus-visible': {
    outline: '2px solid blue',
    outlineOffset: '2px',
  },

  isActive: (el, s) => s.root.activeRunType === s.name,
  '.isActive': {
    background: 'blue',
    color: 'white',
  },
  '.!isActive': {
    background: 'transparent',
    color: 'caption',
    ':hover': {
      color: 'title',
      background: 'gray.1',
    },
  },

  onClick: (e, el, s) => {
    s.root.update({ activeRunType: s.name })
  },
}
