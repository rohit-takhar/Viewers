const displayFunction = data => {
  let meanValue = '';
  if (data.meanStdDev && data.meanStdDev.mean) {
    meanValue = data.meanStdDev.mean.toFixed(2) + ' HU';
  }
  return meanValue;
};

export const CorrectionScissors = {
  id: 'CorrectionScissors',
  name: 'CorrectionScissors',
  toolGroup: 'allTools',
  cornerstoneToolType: 'CorrectionScissors',
  options: {
    measurementTable: {
      displayFunction,
    },
    caseProgress: {
      include: true,
      evaluate: true,
    },
  },
};
