var React = require('react');
var ReactDOM = require('react-dom');
var { Surface, Triangle, Rectangle } = require('react-regl');
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
    setInterval(() => { this.toggleState(); }, 500);
  },

  render () {

    var points = [];
    for (var i = 0; i < 1000; i ++) {
      points.push({
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1
      });
    }
    return (
      <div>
        <Surface width={600} height={400}>
          {
            points.map((d, i) => {
              return (
                <Rectangle key={i} x={d.x} y={d.y} width={0.02} height={0.05} color={[Math.random(), Math.random(), Math.random(), 0.5]} />
              );
            })
          }
        </Surface>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
