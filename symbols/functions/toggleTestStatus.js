export const toggleTestStatus = function toggleTestStatus(testId, newStatus) {
  const rootEl = this.getRoot()
  const rootState = rootEl.state
  if (!rootState) return

  const runs = rootState.testRuns || []
  const idx = runs.findIndex(r => r.id === testId)
  if (idx === -1) return

  const prevStatus = runs[idx].status

  // Optimistic update — immediately reflect new state
  const updatedRuns = runs.map((r, i) =>
    i === idx ? Object.assign({}, r, { status: newStatus }) : r
  )
  rootState.update({ testRuns: updatedRuns })

  // Simulate async API call (300ms latency)
  const self = rootEl
  setTimeout(() => {
    // Simulate 10% failure rate for demo
    const apiFailed = Math.random() < 0.1
    if (apiFailed) {
      // Revert optimistic update on failure
      const currentState = self.state
      const currentRuns = currentState.testRuns || []
      const revertedRuns = currentRuns.map((r, i) =>
        i === idx ? Object.assign({}, r, { status: prevStatus }) : r
      )
      currentState.update({
        testRuns: revertedRuns,
        toastMessage: 'Failed to update status — reverted',
        toastType: 'error',
      })
      // Auto-dismiss toast after 4s
      setTimeout(() => {
        self.state.update({ toastMessage: null })
      }, 4000)
    }
  }, 300)
}
