import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { NavBar, Drawer } from 'antd-mobile';
import * as TodoNav from '../actions/navbar';
import * as TodoRoute from '../actions/routeAction'

class App extends React.Component {
	constructor(props){
		super(props);
	}
	render() {
		console.log(this.props)
		return (
			<div className="container">
				<NavBar mode="light"
					iconName={null}
					leftContent={<b onClick={() => this.props.left.func ? this.props.left.func() : hashHistory.goBack()}>{this.props.left.text}</b>}
					rightContent={<b onClick={() => this.props.right.func ? this.props.right.func() : hashHistory.push('/index')}>{this.props.right.text}</b>}
				>
					{this.props.title}
				</NavBar>

				<div style={{ position: 'relative', height: '100%' }}>
					<Drawer>
						{this.props && this.props.children && React.cloneElement(this.props.children, {
							changeNav: this.props.actions.changeNav,
							//changeRoute: this.props.actions.changeRoute
						}) || 'no content'}
					</Drawer>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProp) => {
	console.log(state)
	return state.todoNav      
    // return {
	// 	title: state.todoNav.title,
	// 	left: state.todoNav.left,
	// 	right: state.todoNav.right,
	// 	//routeAction: {...state.todoRoute}
    // }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
		actions: bindActionCreators(Object.assign({},TodoNav), dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
// export default App