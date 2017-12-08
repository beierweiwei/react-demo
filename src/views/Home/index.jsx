import React from 'react';
import './index.css'
class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {date: new Date(), clock: null};
	}

	componentDidMount() {
		this.clock();
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}
	tick() {
		this.setState({
			date: new Date()
		})
	}
	clock() {
		this.timerId = setInterval(() => this.tick(),  1000)
	}
	render() {
		return (
			<div className="page">
				<div className="banner">time:{this.state.date.toLocaleTimeString()}</div>
				<div className="navbar"> main </div>
				<div className="prod-recommond">
					<div className="prod-list">
						<div className="prod-item">
							prod-item
						</div>
					</div>	
				</div>
			</div>
		)
	}
}

export default Home;