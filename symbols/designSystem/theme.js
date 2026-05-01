export default {
  document: {
    background: 'surfaceAlt',
    color: 'title',
  },
  dialog: {
    background: 'surfaceElevated',
    color: 'title',
    backdropFilter: 'blur(3px)',
    borderColor: 'borderSubtle',
    outlineColor: 'blue',
  },
  'dialog-elevated': {
    color: 'title',
    background: 'surfaceElevated',
    borderColor: 'borderSubtle',
    outlineColor: 'blue',
    backgroundKey: 'caption',
  },
  field: {
    color: 'title',
    background: 'surface',
    '::placeholder': {
      color: 'disabled',
    },
  },
  primary: {
    background: 'blue',
    color: 'white',
  },
  warning: {
    background: 'red',
    color: 'white',
  },
  success: {
    background: 'green',
    color: 'white',
  },
  none: {
    color: 'none',
    background: 'none',
  },
  transparent: {
    color: 'currentColor',
    background: 'transparent',
  },
  bordered: {
    background: 'transparent',
    border: '1px solid borderSubtle',
  },

  // QA Status themes
  statusPass: {
    background: 'passGreen.1',
    color: 'passGreen-20',
    border: '1px solid passGreen.25',
  },
  statusFail: {
    background: 'failRed.08',
    color: 'failRed-20',
    border: '1px solid failRed.2',
  },
  statusBlocked: {
    background: 'blockedAmber.1',
    color: 'blockedAmber-20',
    border: '1px solid blockedAmber.25',
  },
  statusSkipped: {
    background: 'skippedSlate.08',
    color: 'skippedSlate-20',
    border: '1px solid skippedSlate.15',
  },

  // Surface card
  card: {
    background: 'surfaceElevated',
    borderColor: 'borderSubtle',
    border: '1px solid borderSubtle',
  },
}
