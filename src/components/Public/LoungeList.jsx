import './index.less'
import React from 'react';
import {ListView, SwipeAction, Button } from 'antd-mobile';
import { hashHistory } from 'react-router';
import $ from 'jquery'
import moment from 'moment'
import {serverUrl,serverUrl1,imgUrl} from '../../utils/utils'

export default class LoungeList extends React.Component {
    state = {
        data: null,
    }
    componentDidMount() {
        const _this = this
        this.setState({
            data:_this.props.data
        })
    }
    intoProductDetail=(v,i)=>{
         hashHistory.push(`loungeDetail/${this.state.data.id}`)
    }
  render() {
    const ii = this.state.data
    return (
        <div className='product-item' onClick={this.intoProductDetail.bind(ii,this)}>
            <img className='product-img' src={`${ii==null?'':ii.imgUrl}`}/>
            <span className='product-title'>{ii==null?'':ii.loungeName}</span>
            <span className='product-site'><img src={require('../../images/gps.png')} style={{marginRight:'15px'}}/>{ii==null?'':ii.terminalName+',登机口'+ii.boardingGate}</span>
        </div>
    );
  }
}