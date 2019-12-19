import log from '../log';

export const retrieveMeasurements = (patientId, timepointIds) => {
  log.error('retrieveMeasurements');
  return Promise.resolve();
};

export const storeMeasurements = (measurementData, timepointIds) => {
  log.error('storeMeasurements');
  log.info("Hereeeeeee");
  const studyInstanceUid = measurementData[Object.keys(measurementData)[0]][0].studyInstanceUid;
  log.info(studyInstanceUid);
  return Promise.resolve();
};

export const retrieveTimepoints = filter => {
  log.error('retrieveTimepoints');
  return Promise.resolve();
};

export const storeTimepoints = timepointData => {
  log.error('storeTimepoints');
  return Promise.resolve();
};

export const updateTimepoint = (timepointData, query) => {
  log.error('updateTimepoint');
  return Promise.resolve();
};

export const removeTimepoint = timepointId => {
  log.error('removeTimepoint');
  return Promise.resolve();
};

export const disassociateStudy = (timepointIds, studyInstanceUid) => {
  log.error('disassociateStudy');
  return Promise.resolve();
};
