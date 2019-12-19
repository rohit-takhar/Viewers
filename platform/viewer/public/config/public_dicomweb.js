window.config = {
  routerBasename: '/',
  showStudyList: true,
  servers: {
    dicomWeb: [
      {
        name: 'DCM4CHEE',
        wadoUriRoot: 'http://192.168.25.5:8042//dicom-web/',
        qidoRoot: 'http://192.168.25.5:8042//dicom-web/',
        wadoRoot: 'http://192.168.25.5:8042//dicom-web/',
        qidoSupportsIncludeField: true,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
      },
    ],
  },
  i18n: {
    LOCIZE_PROJECTID: 'a8da3f9a-e467-4dd6-af33-474d582a0294',
    LOCIZE_API_KEY: null, // Developers can use this to do in-context editing. DO NOT COMMIT THIS KEY!
    USE_LOCIZE: false,
  },
};
