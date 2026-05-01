export const toggleRowExpand = function toggleRowExpand(testId) {
  const rootState = this.getRoot().state
  if (!rootState) return

  const expanded = rootState.expandedTestIds || []
  const isExpanded = expanded.includes(testId)

  if (isExpanded) {
    rootState.update({ expandedTestIds: expanded.filter(id => id !== testId) })
  } else {
    rootState.update({ expandedTestIds: expanded.concat([testId]) })
  }
}
