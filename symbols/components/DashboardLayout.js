// DashboardLayout: root container for the QA dashboard
export const DashboardLayout = {
  flow: 'y',
  width: '100%',
  minHeight: '100vh',
  position: 'relative',

  TopBar: {
    extends: 'DashboardHeaderBar',
  },

  MainContentArea: {
    flow: 'y',
    flex: '1',
    gap: 'A',
    padding: 'A B',
    overflow: 'auto',

    '@tabletS': {
      padding: 'Z A',
    },

    // Metrics panel above the grid
    MetricsPanel: {
      extends: 'MetricsOverviewPanel',
    },

    // Main test grid
    TestGrid: {
      extends: 'ExpandableTestGrid',
    },
  },

  // Global overlays
  LogModal: {
    extends: 'LogViewerModal',
  },

  Toast: {
    extends: 'ToastNotification',
  },
}
