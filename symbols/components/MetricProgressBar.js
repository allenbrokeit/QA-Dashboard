// MetricProgressBar: reusable progress bar for pass/fail/blocked rates
// NOTE: Use PassBar, FailBar, BlockedBar specializations directly in MetricsOverviewPanel
// Each one calls computeMetrics internally to avoid prop-passing complexity.
export const MetricProgressBar = {
  flow: 'y',
  gap: 'X',

  MetricBarHeader: {
    flow: 'x',
    align: 'center space-between',

    MetricBarLabel: {
      fontSize: 'Y',
      fontWeight: '500',
      color: 'caption',
      text: 'Metric',
    },

    MetricBarCount: {
      fontSize: 'Y',
      fontWeight: '700',
      text: '0',
    },
  },

  MetricBarTrack: {
    width: '100%',
    height: 'X',
    borderRadius: 'X',
    background: 'gray.1',
    overflow: 'hidden',
    position: 'relative',

    MetricBarFill: {
      position: 'absolute',
      top: '0',
      left: '0',
      height: '100%',
      borderRadius: 'X',
      transition: 'width 0.6s cubic-bezier(.29,.67,.51,.97)',
      background: 'gray',
      width: '0%',
    },
  },

  MetricBarPct: {
    fontSize: 'Y',
    fontWeight: '500',
    color: 'disabled',
    text: '0%',
  },
}

// Specialized progress bars that call computeMetrics directly
export const PassProgressBar = {
  flow: 'y',
  gap: 'X',

  MetricBarHeader: {
    flow: 'x',
    align: 'center space-between',
    MetricBarLabel: {
      fontSize: 'Y',
      fontWeight: '500',
      color: 'caption',
      text: 'Pass Rate',
    },
    MetricBarCount: {
      fontSize: 'Y',
      fontWeight: '700',
      color: 'passGreen',
      text: (el, s) => '' + el.call('computeMetrics').passed,
    },
  },
  MetricBarTrack: {
    width: '100%',
    height: 'X',
    borderRadius: 'X',
    background: 'gray.1',
    overflow: 'hidden',
    position: 'relative',
    MetricBarFill: {
      position: 'absolute',
      top: '0',
      left: '0',
      height: '100%',
      borderRadius: 'X',
      transition: 'width 0.6s cubic-bezier(.29,.67,.51,.97)',
      background: 'passGreen',
      width: (el, s) => el.call('computeMetrics').passRate + '%',
    },
  },
  MetricBarPct: {
    fontSize: 'Y',
    fontWeight: '500',
    color: 'disabled',
    text: (el, s) => el.call('computeMetrics').passRate + '%',
  },
}

export const FailProgressBar = {
  flow: 'y',
  gap: 'X',

  MetricBarHeader: {
    flow: 'x',
    align: 'center space-between',
    MetricBarLabel: {
      fontSize: 'Y',
      fontWeight: '500',
      color: 'caption',
      text: 'Fail Rate',
    },
    MetricBarCount: {
      fontSize: 'Y',
      fontWeight: '700',
      color: 'failRed',
      text: (el, s) => '' + el.call('computeMetrics').failed,
    },
  },
  MetricBarTrack: {
    width: '100%',
    height: 'X',
    borderRadius: 'X',
    background: 'gray.1',
    overflow: 'hidden',
    position: 'relative',
    MetricBarFill: {
      position: 'absolute',
      top: '0',
      left: '0',
      height: '100%',
      borderRadius: 'X',
      transition: 'width 0.6s cubic-bezier(.29,.67,.51,.97)',
      background: 'failRed',
      width: (el, s) => el.call('computeMetrics').failRate + '%',
    },
  },
  MetricBarPct: {
    fontSize: 'Y',
    fontWeight: '500',
    color: 'disabled',
    text: (el, s) => el.call('computeMetrics').failRate + '%',
  },
}

export const BlockedProgressBar = {
  flow: 'y',
  gap: 'X',

  MetricBarHeader: {
    flow: 'x',
    align: 'center space-between',
    MetricBarLabel: {
      fontSize: 'Y',
      fontWeight: '500',
      color: 'caption',
      text: 'Blocked Rate',
    },
    MetricBarCount: {
      fontSize: 'Y',
      fontWeight: '700',
      color: 'blockedAmber',
      text: (el, s) => '' + el.call('computeMetrics').blocked,
    },
  },
  MetricBarTrack: {
    width: '100%',
    height: 'X',
    borderRadius: 'X',
    background: 'gray.1',
    overflow: 'hidden',
    position: 'relative',
    MetricBarFill: {
      position: 'absolute',
      top: '0',
      left: '0',
      height: '100%',
      borderRadius: 'X',
      transition: 'width 0.6s cubic-bezier(.29,.67,.51,.97)',
      background: 'blockedAmber',
      width: (el, s) => el.call('computeMetrics').blockedRate + '%',
    },
  },
  MetricBarPct: {
    fontSize: 'Y',
    fontWeight: '500',
    color: 'disabled',
    text: (el, s) => el.call('computeMetrics').blockedRate + '%',
  },
}
