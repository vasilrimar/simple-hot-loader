# simple-hot-loader

This **toy project** started as an idea for live-reloading Mithril views and controllers (example coming soon).  It is a fork of https://github.com/gaearon/react-hot-loader, which is a **stable for daily use in development** implementation of [React live code editing](http://www.youtube.com/watch?v=pw4fKkyPPg8).

This loader handles some simple cases where live-updating should be pretty trivial.  The main use case is updating prototypes, and I'm also toying with updating objects and functions using wrappers.  

This loader should allow many elements of the application to be modified while running with minimal reloads of additional components or the entire page.  Beyond that, you'll usually want to rerender some bits if you modified a view.  Currently that is handled via a simple custom "hotreload" event on the document.

### Exceptions

As opposed to react-hot-loader, this loader will process any JS, but trust me, you don't want it on all your JS, particularly node modules and itself.  Best to map it to a subset of your JS using a loader matching expression such as the one in example/webpack.config.js.

### Source Maps

If you use `devtool: 'source-map'` (or its equivalent), source maps will be emitted to hide hot reloading code.

This also works when previous loader emits its own source maps.

## Running Example

```
npm install
npm start
open http://localhost:8080/webpack-dev-server/bundle
```

Then edit `example/instanceA.js` and `example/ClassB.jsx`.
Your changes should be displayed live, without unmounting components or destroying their state.

## Implementation Notes

Simply keep track of the original module.exports and employ a few merge strategies to update it.  If there is a prototype property, it is merged using util-extend.  Otherwise the original module.exports is updated with properties from the new one.  After this, a custom 'hotreload' event is triggered on the document.

## Changelog

#### 0.0.0 (so far)
* forked https://github.com/gaearon/react-hot-loader
* removed JSX dependencies
* reimplemented component updater
* support for merging objects and prototypes

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
