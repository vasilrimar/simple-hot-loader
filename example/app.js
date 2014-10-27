var tag = require('./tag')
  , a = require('./instanceA')
  , B = require('./ClassB')

console.log("APP LOAD");
var loadTime = new Date();

var header = 
  tag("h1", "App") +
  tag("p", "Changing code right here will reload the whole page.");

var instanceB = new B({
  title: "Outer Instance of B",
  created: new Date()
});

function render(){
  console.log("rendering app");
  var el = document.body;
  var html = [
    header,
    tag('p', "Loaded at: " + tag('strong', loadTime)),
    a.render({ 
      testing: 123, 
      loadTime:loadTime    
    }),
    instanceB.render()
  ].join("");    
  setHtml(el, html);
  console.log('rendered app', el);
};

function setHtml(el, html){  
  el.innerHTML = html;
}
document.addEventListener('hotreload', function(){
  console.log('got hot reload event');
  render();
});

render();


