// ToastNotification: error/success toast with auto-dismiss
export const ToastNotification = {
  position: 'fixed',
  bottom: 'A',
  right: 'A',
  zIndex: '1100',
  flow: 'x',
  align: 'center center',
  gap: 'Z',
  padding: 'Z A',
  borderRadius: 'Z',
  boxShadow: 'black.25 0 A B Y',
  fontSize: 'Y',
  fontWeight: '500',
  maxWidth: 'H',
  lineHeight: '1.4',
  transition: 'all 0.25s cubic-bezier(.29,.67,.51,.97)',

  if: (el, s) => !!s.root.toastMessage,

  isError: (el, s) => s.root.toastType === 'error',
  '.isError': {
    theme: 'statusFail',
  },
  isSuccess: (el, s) => s.root.toastType === 'success',
  '.isSuccess': {
    theme: 'statusPass',
  },

  ToastIcon: {
    extends: 'Icon',
    width: 'Z',
    height: 'Z',
    flex: '0 0 auto',
    icon: (el, s) => s.root.toastType === 'success' ? 'checkCircle' : 'alertTriangle',
  },

  ToastMessage: {
    text: (el, s) => s.root.toastMessage || '',
  },
}
