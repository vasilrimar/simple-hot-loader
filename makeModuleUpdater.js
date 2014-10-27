'use strict';
var extend = require('util-extend');

module.exports = function (filename, props) {
  props = props || {};
  var exports = null;

  function setExports(newExports) {
    if(exports==null){
      exports = newExports;  
    } else {
      updateExports(newExports);
    }
    return exports;
  }
  function getExports() {
    return exports;
  }
  function updateExports(updatedExports) {
    // console.log('updating', updatedExports);
    if(updatedExports.prototype){
      extend(exports.prototype, updatedExports.prototype);
    } else {
      extend(exports,updatedExports);
    }
    props.onHotReload && props.onHotReload(exports);
    return exports;
  }

  return {
    setExports: setExports,
    getExports: getExports,
    updateExports: updateExports    
  };
};
