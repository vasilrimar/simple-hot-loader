var B = require("./ClassB");
var tag = require('./tag');

var msg = 
  "Howdy there.  " + 
  "This message can be updated without reloading the app.";

var loadTime = new Date();

var b = new B({
    title: "Inner Component B",
    created: new Date()
  });

function render(props){
  console.log('and this log message', props);  
  
  return [
    '<h2>Component A</h2>',
    tag('div', msg),
    tag('div', "Testing: " + props.testing),    
    tag('div', "Module A loaded at: " + loadTime),    
    tag('div', b.render()
      , { style: "padding: 1em; margin:1em; border: solid 1px #ccc" }), 
  ].join("");
}
module.exports = {
  msg: msg,
  render: render
};
