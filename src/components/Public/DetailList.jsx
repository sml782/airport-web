import './index.less'
import React from 'react';
import {ListView, SwipeAction, Button } from 'antd-mobile';
import $ from 'jquery'
import moment from 'moment'
export default class DetailList extends React.Component {
    state = {
        data: [],
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        this.setState({data: nextProps.data == null ?[]:nextProps.data.rows});
    }
  render() {
    return (
        <div>
            {this.state.data==null?'':this.state.data.map((ii,index) => {
                    return (<div className='listItem-item' style={{border:'none'}}>
                        <img src={`${ii.weixinPhoto}`}/>
                        <span className='detail-title'>{ii.weixinName}</span>
                        <span className='detail-comment'>{ii.content}</span>
                        <span className='detail-time'>{moment(ii.createTime).format('YYYY-MM-DD hh:mm:ss')}</span>
                    </div>)
            })}
        </div>
        
    );
  }
}