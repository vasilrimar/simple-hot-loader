'use strict';

var updaters = {},
    makeModuleUpdater = require('./makeModuleUpdater');

function makeEvent(name, options){
  var event=null;
  if (window.CustomEvent) {
    event = new CustomEvent(name, options);
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(name, true, true, {some: 'data'});
  }
  return event;
}

function notifyHotReload(exports){
  var e = makeEvent("hotreload", {
    exports: exports
  });
  document.dispatchEvent(e);
}

function getHotUpdateAPI(filename, moduleId) {
  var exists = updaters.hasOwnProperty(moduleId);
  if (!exists) {
    updaters[moduleId] = makeModuleUpdater(filename, {
      onHotReload: notifyHotReload
    });
  }

  var updater = updaters[moduleId];
  return {
    getExports: updater.getExports,
    setExports: updater.setExports,
    updateExports: updater.updateExports
  };
}

module.exports = getHotUpdateAPI;
