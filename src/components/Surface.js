var React = require('react');

var Surface = React.createClass({

  getInitialState () {
    return {
    };
  },

  componentDidMount () {
    var regl = require('regl')(this.refs.canvas);
    this.setState({
      regl: regl
    });
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
