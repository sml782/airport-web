import './index.less'
import React from 'react';
import {ListView, SwipeAction, Button } from 'antd-mobile';
import $ from 'jquery'
import moment from 'moment'
export default class ProductComment extends React.Component {
    state = {
        data: [],
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps.data == null ?[]:nextProps.data.rows});
    }
  render() {
    return (
        <div>
            {this.state.data==null?'':this.state.data.map((ii,index) => {
                    return (<div className='listItem-item' style={{border:'none'}}>
                        <img src={`${ii.weixinPhoto}`}/>
                        <span className='ProductComment-title'>{ii.weixinName}</span>
                        <span className='ProductComment-time'>{moment(ii.createTime).format('YYYY-MM-DD hh:mm:ss')}</span>
                        <span className='ProductComment-comment'>{ii.content}</span>
                    </div>)
            })}
        </div>
        
    );
  }
}