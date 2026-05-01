export const computeMetrics = function computeMetrics() {
  const rootState = this.getRoot().state
  const runs = (rootState && rootState.testRuns) ? rootState.testRuns : []
  const total = runs.length
  if (total === 0) return { passed: 0, failed: 0, blocked: 0, skipped: 0, total: 0, passRate: 0, failRate: 0, blockedRate: 0, skippedRate: 0 }

  const passed = runs.filter(r => r.status === 'passed').length
  const failed = runs.filter(r => r.status === 'failed').length
  const blocked = runs.filter(r => r.status === 'blocked').length
  const skipped = runs.filter(r => r.status === 'skipped').length

  return {
    total,
    passed,
    failed,
    blocked,
    skipped,
    passRate: Math.round((passed / total) * 100),
    failRate: Math.round((failed / total) * 100),
    blockedRate: Math.round((blocked / total) * 100),
    skippedRate: Math.round((skipped / total) * 100),
  }
}
