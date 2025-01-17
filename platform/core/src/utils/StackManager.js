import OHIFError from '../classes/OHIFError.js';
import getImageId from './getImageId';

let stackMap = {};
let configuration = {};
let stackManagerMetaDataProvider;
const stackUpdatedCallbacks = [];

/**
 * Loop through the current series and add metadata to the
 * Cornerstone meta data provider. This will be used to fill information
 * into the viewport overlays, and to calculate reference lines and orientation markers
 * @param  {Object} stackMap              stackMap object
 * @param  {Object} study                 Study object
 * @param  {Object} displaySet            The set of images to make the stack from
 * @return {Array}                        Array with image IDs
 */
function createAndAddStack(
  stackMap,
  study,
  displaySet,
  stackUpdatedCallbacks,
  metadataProvider
) {
  const images = displaySet.images;
  if (!images) {
    return;
  }

  const numImages = images.length;
  const imageIds = [];
  let imageId;

  displaySet.images.forEach((instance, imageIndex) => {
    const image = instance.getData();
    const metaData = {
      instance: image, // in this context, instance will be the data of the InstanceMetadata object...
      series: displaySet, // TODO: Check this
      study,
      numImages,
      imageIndex: imageIndex + 1,
    };

    const numberOfFrames = image.numberOfFrames;
    if (numberOfFrames > 1) {
      for (let i = 0; i < numberOfFrames; i++) {
        metaData.frameNumber = i;
        imageId = getImageId(image, i);
        imageIds.push(imageId);
        metadataProvider.addMetadata(imageId, metaData);
      }
    } else {
      metaData.frameNumber = 1;
      imageId = getImageId(image);
      imageIds.push(imageId);
      metadataProvider.addMetadata(imageId, metaData);
    }
  });

  const stack = {
    studyInstanceUid: study.studyInstanceUid,
    displaySetInstanceUid: displaySet.displaySetInstanceUid,
    imageIds,
    frameRate: displaySet.frameRate,
    isClip: displaySet.isClip,
  };

  stackMap[displaySet.displaySetInstanceUid] = stack;

  return stack;
}

configuration = {
  createAndAddStack,
};

/**
 * This object contains all the functions needed for interacting with the stack manager.
 * Generally, findStack is the only function used. If you want to know when new stacks
 * come in, you can register a callback with addStackUpdatedCallback.
 */
const StackManager = {
  setMetadataProvider(provider) {
    stackManagerMetaDataProvider = provider;
  },
  /**
   * Removes all current stacks
   */
  clearStacks() {
    stackMap = {};
  },
  /**
   * Create a stack from an image set, as well as add in the metadata on a per image bases.
   * @param study The study who's metadata will be added
   * @param displaySet The set of images to make the stack from
   * @return {Array} Array with image IDs
   */
  makeAndAddStack(study, displaySet) {
    if (!stackManagerMetaDataProvider) {
      throw new Error(
        'Please call StackManager.setMetadataProvider(provider) first.'
      );
    }

    return configuration.createAndAddStack(
      stackMap,
      study,
      displaySet,
      stackUpdatedCallbacks,
      stackManagerMetaDataProvider
    );
  },
  /**
   * Find a stack from the currently created stacks.
   * @param displaySetInstanceUid The UID of the stack to find.
   * @returns {*} undefined if not found, otherwise the stack object is returned.
   */
  findStack(displaySetInstanceUid) {
    return stackMap[displaySetInstanceUid];
  },
  /**
   * Find a stack or reate one if it has not been created yet
   * @param study The study who's metadata will be added
   * @param displaySet The set of images to make the stack from
   * @return {Array} Array with image IDs
   */
  findOrCreateStack(study, displaySet) {
    let stack = this.findStack(displaySet.displaySetInstanceUid);

    if (!stack || !stack.imageIds) {
      stack = this.makeAndAddStack(study, displaySet);
    }

    return stack;
  },
  /**
   * Gets the underlying map of displaySetInstanceUid to stack object.
   * WARNING: Do not change this object. It directly affects the manager.
   * @returns {{}} map of displaySetInstanceUid -> stack.
   */
  getAllStacks() {
    return stackMap;
  },
  /**
   * Adds in a callback to be called on a stack being added / updated.
   * @param callback must accept at minimum one argument,
   * which is the stack that was added / updated.
   */
  addStackUpdatedCallback(callback) {
    if (typeof callback !== 'function') {
      throw new OHIFError('callback must be provided as a function');
    }
    stackUpdatedCallbacks.push(callback);
  },
  /**
   * Return configuration
   */
  getConfiguration() {
    return configuration;
  },
  /**
   * Set configuration, in order to provide compatibility
   * with other systems by overriding this functions
   * @param {Object} config object with functions to be overrided
   *
   * For now, only makeAndAddStack can be overrided
   */
  setConfiguration(config) {
    configuration = config;
  },
};

export { StackManager };
export default StackManager;
