'use strict';

var path = require('path'),
    SourceNode = require('source-map').SourceNode,
    SourceMapConsumer = require('source-map').SourceMapConsumer,
    makeIdentitySourceMap = require('./makeIdentitySourceMap');


module.exports = function (source, map) {
  if (this.cacheable) {
    this.cacheable();
  }

  var huaId = require.resolve('./getHotUpdateAPI');

  var resourcePath = this.resourcePath,
      filename = path.basename(resourcePath),
      separator = '\n\n',
      prependText,
      appendText,
      node,
      result;

  prependText = [
    'var __HUA = (function () {',
      'var getHotUpdateAPI = require(' + JSON.stringify(require.resolve('./getHotUpdateAPI')) + ');',
      'return getHotUpdateAPI(' + JSON.stringify(filename) + ', module.id);',
    '})();',
    'if (module.hot) {',
      'module.hot.accept(function (err) {',
        'if (err) {',
          'console.error("Cannot not apply hot update to " + ' + JSON.stringify(filename) + ' + ": " + err.message);',
        '}',
      '});',
      'module.hot.dispose(function () {',
        'var nextTick = require(' + JSON.stringify(require.resolve('next-tick')) + ');',
        'nextTick(__HUA.updateExports.bind(null,module));',
      '});',
    '}'
  ].join(' ');

  appendText = [
    '__HUA.setExports(module.exports);',
    'module.exports = __HUA.getExports();'
  ].join(' ');

  if (this.sourceMap === false) {
    return this.callback(null, [
      prependText,
      source,
      appendText
    ].join(separator));
  }

  if (!map) {
    map = makeIdentitySourceMap(source, this.resourcePath);
  }

  node = new SourceNode(null, null, null, [
    new SourceNode(null, null, this.resourcePath, prependText),
    SourceNode.fromStringWithSourceMap(source, new SourceMapConsumer(map)),
    new SourceNode(null, null, this.resourcePath, appendText),
  ]).join(separator);

  result = node.toStringWithSourceMap();

  this.callback(null, result.code, result.map.toString());
};
