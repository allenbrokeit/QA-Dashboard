// TestStepsList: detailed step-by-step list revealed on row expansion
export const TestStepsList = {
  flow: 'y',
  gap: 'Z',
  padding: 'A B',
  background: 'surfaceAlt',
  borderTop: '1px solid',
  borderColor: 'borderSubtle',

  StepsHeaderRow: {
    flow: 'x',
    align: 'center space-between',
    marginBottom: 'Y',

    // SC 1.3.1 — h3 corrects the heading skip (parent h2 = "Test Cases")
    // h4 was skipping from h2, changed to h3 for proper hierarchy
    StepsTitle: {
      tag: 'h3',
      fontSize: 'Y',
      fontWeight: '700',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'caption',
      text: 'Test Steps',
    },

    PreconditionLabel: {
      fontSize: 'Y',
      color: 'disabled',
      fontStyle: 'italic',
      text: (el, s) => s.precondition ? 'Pre: ' + s.precondition : '',
    },
  },

  StepsList: {
    flow: 'y',
    gap: 'Y',
    children: (el, s) => s.steps || [],
    childExtends: 'TestStepItem',
    childrenAs: 'state',
  },
}

export const TestStepItem = {
  flow: 'x',
  align: 'flex-start start',
  gap: 'Z',
  paddingTop: 'Y',
  borderTop: '1px solid',
  borderColor: 'borderSubtle',

  StepNumber: {
    flex: '0 0 auto',
    width: 'A',
    height: 'A',
    borderRadius: '50%',
    align: 'center center',
    flow: 'x',
    background: 'blue.1',
    border: '1px solid blue.2',
    fontSize: 'Y',
    fontWeight: '700',
    color: 'blue',
    // SC 1.3.1 — step number is meaningful, not decorative
    text: (el, s) => '' + s.stepNumber,
  },

  StepContent: {
    flow: 'y',
    gap: 'X',
    flex: '1',

    StepAction: {
      fontSize: 'Z',
      fontWeight: '500',
      color: 'title',
      text: (el, s) => s.action,
    },

    StepExpected: {
      fontSize: 'Y',
      fontWeight: '400',
      color: 'caption',
      text: (el, s) => 'Expected: ' + s.expectedResult,
    },
  },
}
