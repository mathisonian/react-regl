# React Regl

React bindings to [regl](https://github.com/mikolalysenko/regl)

## Demo & Examples

Live demo: [mathisonian.github.io/react-regl](http://mathisonian.github.io/react-regl/)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use react-regl is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-regl.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-regl --save
```


## Usage

Example:

```js
var React = require('react');
var ReactDOM = require('react-dom');
var { Surface, Triangle } = require('react-regl');
var Victory = require('victory');

var App = React.createClass({

  getInitialState () {
    return {
      x: 0
    }
  },

  toggleState () {
    this.setState({
      x: 2 * Math.PI - this.state.x
    })
  },

  componentDidMount () {
    this.toggleState();
  },

  render () {
    return (
      <div>
        <Victory.VictoryAnimation data={{ x: this.state.x }} onEnd={toggleState}>
          {
            (tweened) => {
              return (
                <Surface width={600} height={400}>
                  <Triangle
                    position={[[Math.sin(tweened.x), -1], [Math.cos(tweened.x), 1], [1, Math.sin(tweened.x)]]}
                    color={[Math.abs(Math.sin(tweened.x)), Math.cos(1), tweened.x, 1]} />
                </Surface>
              )
            }
          }
        </Victory.VictoryAnimation>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
```

### Properties

* __DOCUMENT PROPERTIES HERE__

### Notes

__ADDITIONAL USAGE NOTES__


## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

## License

__PUT LICENSE HERE__

Copyright (c) 2016 Matthew Conlen.
