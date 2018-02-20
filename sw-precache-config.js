
module.exports = {
  navigateFallback: '/index.html',
  stripPrefix: 'dist/',
  replacePrefix: './',
  root: 'dist/',
  staticFileGlobs: [
    'dist/index.html',
    'dist/**.js',
    'dist/**.css',
    'dist/assets/**.png',
    'dist/assets/**.json'
  ],
  runtimeCaching: [{
    urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
    handler: 'cacheFirst'
  },
  {
    urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
    handler: 'cacheFirst'
  }],
};
