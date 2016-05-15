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

	componentDidMount () {
		this.setState({
			x: 2 * Math.PI
		})
	},

	render () {
		return (
			<div>
				<Victory.VictoryAnimation data={{ x: this.state.x }} onEnd={() => { this.setState({x: 2 * Math.PI - this.state.x}); }}>
					{
						(tweened) => {
							return (
								<Surface width={600} height={400}>
									<Triangle position={[[Math.sin(tweened.x), -1], [Math.cos(tweened.x), 1], [1, Math.sin(tweened.x)]]} color={[Math.abs(Math.sin(tweened.x)), Math.cos(1), tweened.x, 1]} />
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
