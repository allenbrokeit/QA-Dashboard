// LogViewerModal: slide-out modal for stack trace / error log display
export const LogViewerModal = {
  // SC 1.3.1, 4.1.2 - Handle dialog semantics
  role: 'dialog',
  ariaModal: 'true',
  ariaLabelledBy: 'log-modal-title',

  position: 'fixed',
  top: '0',
  right: '0',
  bottom: '0',
  width: 'G',
  maxWidth: '100vw',
  flow: 'y',
  theme: 'dialog',
  borderLeft: '1px solid',
  borderColor: 'borderSubtle',
  zIndex: '1000',
  transition: 'transform 0.28s cubic-bezier(.29,.67,.51,.97)',
  boxShadow: 'black.3 -C 0 E Z',

  // Slide in/out via isOpen conditional
  if: (el, s) => s.root.logModalOpen,

  isOpen: (el, s) => s.root.logModalOpen,
  '.isOpen': {
    transform: 'translateX(0)',
  },

  ModalHeaderBar: {
    flow: 'x',
    align: 'center space-between',
    padding: 'A B',
    borderBottom: '1px solid borderSubtle',
    flexShrink: '0',

    ModalTitleGroup: {
      flow: 'y',
      gap: 'X',

      ModalIcon: {
        extends: 'Icon',
        icon: 'terminal',
        width: 'A',
        height: 'A',
        color: 'failRed',
        ariaHidden: 'true',
      },

      ModalTitle: {
        tag: 'h3',
        id: 'log-modal-title',
        fontSize: 'Z',
        fontWeight: '700',
        color: 'title',
        text: 'Error Log',
      },

      ModalSubtitle: {
        fontSize: 'Y',
        color: 'caption',
        text: (el, s) => s.root.logModalTestId ? 'Test: ' + s.root.logModalTestId : 'Test log',
      },
    },

    CloseModalBtn: {
      tag: 'button',
      padding: 'Y',
      borderRadius: 'Y',
      cursor: 'pointer',
      background: 'transparent',
      border: 'none',
      color: 'caption',
      transition: 'all 0.15s ease',
      // SC 4.1.2 - Close button label
      ariaLabel: 'Close error log',

      ':hover': {
        background: 'gray.1',
        color: 'title',
      },
      ':focus-visible': {
        outline: '2px solid blue',
        outlineOffset: '2px',
      },

      CloseIcon: {
        extends: 'Icon',
        icon: 'close',
        width: 'A',
        height: 'A',
        ariaHidden: 'true',
      },

      onClick: (e, el, s) => el.call('closeLogModal'),
    },
  },

  LogContentArea: {
    flex: '1',
    overflow: 'auto',
    padding: 'A B',

    LogPre: {
      tag: 'pre',
      fontFamily: '"JetBrains Mono", "Fira Code", monospace',
      fontSize: 'Y',
      lineHeight: '1.7',
      color: 'failRed',
      background: 'transparent',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',
      margin: '0',
      text: (el, s) => s.root.logModalContent || 'No log content available.',

      // Focusable for keyboard scroll
      tabindex: '0',
      ariaLabel: 'Log output content',

      '@dark': {
        color: 'failRed',
      },
      '@light': {
        color: 'failRed-20',
      },
    },
  },

  ModalFooter: {
    flow: 'x',
    align: 'center space-between',
    padding: 'Z B',
    borderTop: '1px solid borderSubtle',
    flexShrink: '0',

    FooterNote: {
      fontSize: 'Y',
      color: 'disabled',
      text: 'Stack trace from last failed run',
    },

    DismissBtn: {
      tag: 'button',
      padding: 'Y Z',
      borderRadius: 'Y',
      cursor: 'pointer',
      theme: 'dialog',
      border: '1px solid borderSubtle',
      fontSize: 'Y',
      fontWeight: '500',
      transition: 'all 0.15s ease',
      text: 'Close',
      ariaLabel: 'Close error log dialog',
      ':hover': {
        border: '1px solid blue',
        color: 'blue',
      },
      ':focus-visible': {
        outline: '2px solid blue',
        outlineOffset: '2px',
      },
      onClick: (e, el, s) => el.call('closeLogModal'),
    },
  },
}
