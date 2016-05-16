var React = require('react');

var Rectangle = React.createClass({

  getInitialState () {
    return {

    };
  },

  initialize(regl) {
    this.setState({
      regl: regl,
      renderer: this.props.getRenderer('triangle')
    });
  },

  componentDidMount () {
    var regl = this.props.getRegl();
    if (!regl) {
      return;
    }

    if (!this.state.renderer) {
      this.initialize(regl);
    }

    this.paint(this.state.renderer);
  },

  componentDidUpdate () {
    var regl = this.props.getRegl();
    if (!regl) {
      return;
    }
    if (!this.state.renderer) {
      this.initialize(regl);
    }

    this.paint(this.state.renderer);
  },

  paint (renderer) {
    if (!renderer) {
      return;
    }

    var x = this.props.x;
    var y = this.props.y;
    var width = this.props.width;
    var height = this.props.height;

    renderer(() => {
      var scopedRenderer = this.state.regl({
        uniforms: {
          color: this.props.color
        }
      });

      scopedRenderer(() => {
        var first = this.state.regl({
          attributes: {
            position: this.state.regl.buffer([[x, y], [x, y + height], [x + width, y + height]])
          },
        });
        var second = this.state.regl({
          attributes: {
            position: this.state.regl.buffer([[x, y], [x + width, y], [x + width, y + height]])
          },
        });

        first();
        second();
      });
    });
  },

  render () {
    return null;
  }
});

export default Rectangle;
