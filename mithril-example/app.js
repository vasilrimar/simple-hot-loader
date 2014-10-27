var m = require("mithril")  
  , todo = require('./todo');

pageLoaded = new Date();
console.log("APP LOAD", pageLoaded);

document.addEventListener('hotreload', function(){
  console.log('got hot reload event!');
  m.redraw();
});

m.module(document.body, todo);


