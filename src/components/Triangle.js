var React = require('react');

var Triangle = React.createClass({

  getInitialState () {
    return {

    };
  },

  componentDidMount () {
    var regl = this.props.getRegl();
    if (!regl) {
      return;
    }

    var renderer = this.getRenderer(regl);
    this.paint(renderer);
  },

  componentDidUpdate () {
    var regl = this.props.getRegl();
    if (!regl) {
      return;
    }

    var renderer = this.getRenderer(regl);
    // this.setState({
    //   renderer: this.getRenderer(regl)
    // });
    this.paint(renderer);
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
      attributes: {
        position: regl.buffer(this.props.position)
      },
      uniforms: {
        color: regl.prop('color')
      },
      count: 3
    });
  },

  paint (renderer) {
    if (!renderer) {
      return;
    }

    renderer({
      color: this.props.color
    });
  },

	render () {
		return null;
	}
});

export default Triangle;
