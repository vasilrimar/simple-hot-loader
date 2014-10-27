var m = require("mithril")
  , head = require('./head')
  , todo = require('./todo');

pageLoaded = new Date();
console.log("APP LOAD", pageLoaded);

document.addEventListener('hotreload', function(){
  console.log('got hot reload event!');
  m.redraw();
});

m.render(document.head, head.render());
m.module(document.body, todo);


