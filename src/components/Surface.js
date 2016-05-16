var React = require('react');
var TriangleRenderer = require('../renderers/triangle');
var renderers = {
  triangle: TriangleRenderer
};

var Surface = React.createClass({

  getInitialState () {
    return {
      rendererCache: {}
    };
  },

  componentDidMount () {
    var regl = require('regl')(this.refs.canvas);
    this.setState({
      regl: regl
    });
  },

  getRenderer (name) {
    if (!this.state.regl) {
      return;
    }

    if (!this.state.rendererCache[name]) {
      this.state.rendererCache[name] = renderers[name](this.state.regl);
    }

    return this.state.rendererCache[name];
  },

  componentDidUpdate: function() {
    if (!this.state.regl) {
      return;
    }

    var children = Object.keys(this.refs).filter(k => k !== 'canvas').map(k => this.refs[k]);
    children.forEach((child) => {
      child.paint();
    });
  },

  getRegl () {
    return this.state.regl;
  },

  render () {
    var regl = this.refs.canvas;
    var children = React.Children.map(this.props.children, (child, i) => {
      return React.cloneElement(child, {
        getRegl: this.getRegl,
        getRenderer: this.getRenderer,
        ref: 'child' + i
      });
    }, this);

    return (
      <canvas ref='canvas' width={this.props.width} height={this.props.height}>
        {children}
      </canvas>
    );
  }
});

export default Surface;
