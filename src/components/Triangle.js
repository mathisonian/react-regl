var React = require('react');

var Triangle = React.createClass({

  getInitialState () {
    return {

    };
  },

  initialize(regl) {
    this.setState({
      regl: regl,
      renderer: this.getRenderer(regl)
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

  getRenderer (regl) {
    return regl({
      frag: `
        precision mediump float;
        uniform vec4 color;
        void main () {
          gl_FragColor = color;
        }
      `,
      vert: `
        precision mediump float;
        attribute vec2 position;
        void main () {
          gl_Position = vec4(position.x, position.y, 0, 1);
        }
      `,
      count: 3
    });
  },

  paint (renderer) {
    if (!renderer) {
      return;
    }

    renderer(() => {
      var scopedRenderer = this.state.regl({
        attributes: {
          position: this.state.regl.buffer(this.props.position)
        },
        uniforms: {
          color: this.props.color
        }
      });

      scopedRenderer();
    });
  },

	render () {
		return null;
	}
});

export default Triangle;
