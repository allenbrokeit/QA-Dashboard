// MetricsOverviewPanel: pass/fail/blocked aggregate metrics display
export const MetricsOverviewPanel = {
  // SC 1.3.1 — Landmark role for main metrics content
  role: 'region',
  ariaLabel: 'Run Health Metrics',

  flow: 'y',
  gap: 'A',
  padding: 'A B',
  borderRadius: 'Z',
  theme: 'card',

  PanelHeaderRow: {
    flow: 'x',
    align: 'center space-between',

    PanelTitle: {
      tag: 'h2',
      fontSize: 'Z',
      fontWeight: '700',
      letterSpacing: '-0.01em',
      color: 'title',
      text: 'Run Health',
    },

    RunStatusBadge: {
      flow: 'x',
      align: 'center center',
      gap: 'X',
      padding: 'X Z',
      borderRadius: 'Y',
      fontSize: 'Y',
      fontWeight: '600',
      border: '1px solid transparent',
      
      // SC 1.3.1 - Convey semantic status
      role: 'status',
      ariaLive: 'polite',

      isHealthy: (el, s) => el.call('computeMetrics').passRate >= 80,
      '.isHealthy': { theme: 'statusPass' },
      isDegraded: (el, s) => {
        var m = el.call('computeMetrics')
        return m.passRate >= 50 && m.passRate < 80
      },
      '.isDegraded': { theme: 'statusBlocked' },
      isCritical: (el, s) => el.call('computeMetrics').passRate < 50,
      '.isCritical': { theme: 'statusFail' },

      StatusDot: {
        width: 'X',
        height: 'X',
        borderRadius: '50%',
        background: 'currentColor',
        // SC 4.1.2 — Decorative dot
        ariaHidden: 'true',
      },

      StatusText: {
        text: (el, s) => {
          var m = el.call('computeMetrics')
          if (m.passRate >= 80) return 'Healthy'
          if (m.passRate >= 50) return 'Degraded'
          return 'Critical'
        },
      },
    },
  },

  MetricSummaryGrid: {
    flow: 'x',
    gap: 'Z',
    align: 'center stretch',
    flexWrap: 'wrap',

    PassStat: {
      flow: 'y',
      align: 'center center',
      gap: 'X',
      padding: 'Z A',
      borderRadius: 'Z',
      background: 'passGreen.08',
      border: '1px solid passGreen.15',
      flex: '1',
      minWidth: 'D',
      // SC 1.3.1 - Group meaningful stats
      ariaLabel: (el, s) => el.call('computeMetrics').passed + ' passed tests',

      StatNumber: {
        tag: 'span',
        fontSize: 'C',
        fontWeight: '800',
        color: 'passGreen',
        letterSpacing: '-0.03em',
        text: (el, s) => '' + el.call('computeMetrics').passed,
        ariaHidden: 'true',
      },

      StatLabel: {
        tag: 'span',
        fontSize: 'Y',
        fontWeight: '600',
        color: 'passGreen',
        opacity: '0.7',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        text: 'Passed',
        ariaHidden: 'true',
      },
    },

    FailStat: {
      flow: 'y',
      align: 'center center',
      gap: 'X',
      padding: 'Z A',
      borderRadius: 'Z',
      background: 'failRed.08',
      border: '1px solid failRed.15',
      flex: '1',
      minWidth: 'D',
      ariaLabel: (el, s) => el.call('computeMetrics').failed + ' failed tests',

      StatNumber: {
        tag: 'span',
        fontSize: 'C',
        fontWeight: '800',
        color: 'failRed',
        letterSpacing: '-0.03em',
        text: (el, s) => '' + el.call('computeMetrics').failed,
        ariaHidden: 'true',
      },

      StatLabel: {
        tag: 'span',
        fontSize: 'Y',
        fontWeight: '600',
        color: 'failRed',
        opacity: '0.7',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        text: 'Failed',
        ariaHidden: 'true',
      },
    },

    BlockedStat: {
      flow: 'y',
      align: 'center center',
      gap: 'X',
      padding: 'Z A',
      borderRadius: 'Z',
      background: 'blockedAmber.08',
      border: '1px solid blockedAmber.15',
      flex: '1',
      minWidth: 'D',
      ariaLabel: (el, s) => el.call('computeMetrics').blocked + ' blocked tests',

      StatNumber: {
        tag: 'span',
        fontSize: 'C',
        fontWeight: '800',
        color: 'blockedAmber',
        letterSpacing: '-0.03em',
        text: (el, s) => '' + el.call('computeMetrics').blocked,
        ariaHidden: 'true',
      },

      StatLabel: {
        tag: 'span',
        fontSize: 'Y',
        fontWeight: '600',
        color: 'blockedAmber',
        opacity: '0.7',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        text: 'Blocked',
        ariaHidden: 'true',
      },
    },

    SkippedStat: {
      flow: 'y',
      align: 'center center',
      gap: 'X',
      padding: 'Z A',
      borderRadius: 'Z',
      background: 'skippedSlate.08',
      border: '1px solid skippedSlate.15',
      flex: '1',
      minWidth: 'D',
      ariaLabel: (el, s) => el.call('computeMetrics').skipped + ' skipped tests',

      StatNumber: {
        tag: 'span',
        fontSize: 'C',
        fontWeight: '800',
        color: 'skippedSlate',
        letterSpacing: '-0.03em',
        text: (el, s) => '' + el.call('computeMetrics').skipped,
        ariaHidden: 'true',
      },

      StatLabel: {
        tag: 'span',
        fontSize: 'Y',
        fontWeight: '600',
        color: 'skippedSlate',
        opacity: '0.7',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        text: 'Skipped',
        ariaHidden: 'true',
      },
    },
  },

  MetricBarsSection: {
    flow: 'y',
    gap: 'Z',
    // SC 4.1.2 - Hide decorative visual bars from screen readers since stats are spoken above
    ariaHidden: 'true',

    PassBar: { extends: 'PassProgressBar' },
    FailBar: { extends: 'FailProgressBar' },
    BlockedBar: { extends: 'BlockedProgressBar' },
  },

  MetricFooter: {
    flow: 'x',
    align: 'center space-between',
    paddingTop: 'Z',
    borderTop: '1px solid',
    borderColor: 'borderSubtle',

    TotalCount: {
      fontSize: 'Y',
      color: 'caption',
      text: (el, s) => el.call('computeMetrics').total + ' tests total',
    },

    PassRateLarge: {
      fontSize: 'A',
      fontWeight: '800',
      color: 'title',

      isPassHigh: (el, s) => el.call('computeMetrics').passRate >= 80,
      '.isPassHigh': { color: 'passGreen' },
      isPassMid: (el, s) => {
        var r = el.call('computeMetrics').passRate
        return r >= 50 && r < 80
      },
      '.isPassMid': { color: 'blockedAmber' },
      isPassLow: (el, s) => el.call('computeMetrics').passRate < 50,
      '.isPassLow': { color: 'failRed' },

      text: (el, s) => el.call('computeMetrics').passRate + '% pass',
    },
  },
}
