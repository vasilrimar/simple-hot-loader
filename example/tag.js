// functions don't get live-reloaded (yet)
module.exports = function html(tag, str, props){
  tag = tag || 'div';
  var attrs = props && Object.keys(props).map(function(prop){
    return prop + '="' + props[prop] + '"'
  }).join(" ");
  if(attrs) console.log('attrs', attrs);
  return "<"+tag+(attrs?' ' + attrs:'')+">"+str+"</"+tag+">";
}