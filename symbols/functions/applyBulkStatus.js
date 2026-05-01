export const applyBulkStatus = function applyBulkStatus(newStatus) {
  const rootEl = this.getRoot()
  const rootState = rootEl.state
  if (!rootState) return

  const selected = rootState.selectedTestIds || []
  if (selected.length === 0) return

  rootState.update({ bulkLoading: true })

  // Optimistic bulk update
  const runs = (rootState.testRuns || []).map(function(r) {
    return selected.includes(r.id) ? Object.assign({}, r, { status: newStatus }) : r
  })
  rootState.update({ testRuns: runs })

  // Simulate API call
  setTimeout(function() {
    rootEl.state.update({
      bulkLoading: false,
      selectedTestIds: [],
      toastMessage: selected.length + ' tests marked as ' + newStatus,
      toastType: 'success',
    })
    setTimeout(function() {
      rootEl.state.update({ toastMessage: null })
    }, 3000)
  }, 600)
}
