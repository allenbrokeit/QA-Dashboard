export const formatDuration = function formatDuration(ms) {
  if (!ms || ms === 0) return '—'
  if (ms < 1000) return ms + 'ms'
  var s = (ms / 1000).toFixed(1)
  return s + 's'
}

export const toggleSelectTest = function toggleSelectTest(testId) {
  var rootState = this.getRoot().state
  if (!rootState) return
  var selected = rootState.selectedTestIds || []
  var isSelected = selected.includes(testId)

  if (isSelected) {
    rootState.update({ selectedTestIds: selected.filter(function(id) { return id !== testId }) })
  } else {
    rootState.update({ selectedTestIds: selected.concat([testId]) })
  }
}

export const toggleSelectAll = function toggleSelectAll() {
  var rootState = this.getRoot().state
  if (!rootState) return
  var runs = rootState.testRuns || []
  var selected = rootState.selectedTestIds || []
  var allSelected = selected.length === runs.length

  if (allSelected) {
    rootState.update({ selectedTestIds: [] })
  } else {
    rootState.update({ selectedTestIds: runs.map(function(r) { return r.id }) })
  }
}

export const openLogModal = function openLogModal(testId, errorMessage) {
  var rootState = this.getRoot().state
  if (!rootState) return
  rootState.update({
    logModalOpen: true,
    logModalTestId: testId,
    logModalContent: errorMessage || 'No error log available for this test run.',
  })
}

export const closeLogModal = function closeLogModal() {
  var rootState = this.getRoot().state
  if (!rootState) return
  rootState.update({
    logModalOpen: false,
    logModalTestId: null,
    logModalContent: null,
  })
}

export const getStatusIcon = function getStatusIcon(status) {
  var icons = {
    passed: 'checkCircle',
    failed: 'xCircle',
    blocked: 'alertCircle',
    skipped: 'minusCircle',
    untested: 'minusCircle',
  }
  return icons[status] || 'minusCircle'
}

export const getStatusLabel = function getStatusLabel(status) {
  var labels = {
    passed: 'Pass',
    failed: 'Fail',
    blocked: 'Blocked',
    skipped: 'Skipped',
    untested: 'Untested',
  }
  return labels[status] || 'Unknown'
}
