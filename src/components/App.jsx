import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { NavBar, Drawer } from 'antd-mobile';
import * as TodoNav from '../actions/navbar';

const leftFunc = () => {
	hashHistory.goBack()
}
const rightFunc = () => {
	hashHistory.push('/index')
}

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			title: 'app',
			leftText: '<',
			rightText: '...',
			open: false,
			leftFunc,
			rightFunc,
		};
	}

	render() {
		return (
			<div className="container">
				<NavBar mode="light"
					iconName={null}
					leftContent={<b onClick={() => this.state.leftFunc()}>{this.state.leftText}</b>}
					rightContent={<b onClick={() => this.state.rightFunc()}>{this.state.rightText}</b>}
				>
					{this.state.title}
				</NavBar>

				<div style={{ position: 'relative', height: '100%' }}>
					<Drawer>
						{this.props && this.props.children && React.cloneElement(this.props.children, {
							changeTitle: title => this.setState({ title }),
							changeLeft: (text,func) => this.setState({ leftText: text, leftFunc: func || leftFunc }),
							changeRight: (text,func) => this.setState({ rightText: text, rightFunc:func || rightFunc }),

						}) || 'no content'}
					</Drawer>
				</div>

				{/*<div className="fixed-bottom">底部固定条</div>*/}
			</div>
		);
	}
}

export default App