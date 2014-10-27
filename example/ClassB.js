var tag = require('./tag');

var loadTime = new Date();

var msg = "You can modify this component without triggering a reload of the page or of Component A";

var B = function(props){
  this.props = props;
  console.log("B", props);
}
B.prototype.render = function(){
  return tag('div', 
    tag('h3', this.props.title) +
    tag('p', msg) +    
    tag('p', "Module B loaded at: " + loadTime) + 
    tag('p', "created: " + this.props.created)
  );
}
module.exports = B;
