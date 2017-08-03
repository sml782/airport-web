import './index.less'
import React from 'react';
import {ListView, SwipeAction, Button } from 'antd-mobile';
import $ from 'jquery'
import moment from 'moment'

export default class ListItem extends React.Component {
    state = {
        data: [],
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps == null ?[]:nextProps.data});
    }
  render() {
    return (
        <div>
            {this.state.data==[]?'':this.state.data.map((ii,index) => {
                if(index !=0){
                    return (<div className='listItem-item'>
                        <img src={`${ii.imgUrl}`}/>
                        <span className='listItem-title'>{ii.title}</span>
                        <span className='listItem-comment'>{ii.numComment}条评论信息</span>
                        <span className='listItem-time'>{moment(ii.createTime).format('YYYY-MM-DD hh:mm:ss')}</span>
                    </div>)
                }
            })}
        </div>
        
    );
  }
}