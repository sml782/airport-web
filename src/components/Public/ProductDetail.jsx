import './index.less'
import React from 'react';
import {ListView, SwipeAction, Button } from 'antd-mobile';
import $ from 'jquery'
import moment from 'moment'
import {Fetcher} from '../../utils/fetch'
import {serverUrl,serverUrl1,imgUrl} from '../../utils/utils'

const {get, post} = Fetcher
export default class ListItem extends React.Component {
    state = {
        data: null,
    }
    componentDidMount() {
        console.log(this.props.params.id)
        this.getDetail()
    }
    componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps == null ?[]:nextProps.data});
    }
    getDetail=()=>{
        const _this = this
        get(serverUrl1+'airport-product/getFlashDetailForWeChat',{shopId:_this.props.params.id}).then(
            result => {
                console.log(result)
                _this.setState({
                    data:result.data,
                })
            }
        )
    }
    createMarkup=()=>{
        return {__html:  this.state.data==null?'':this.state.data.shopDescription};
    }
  render() {
    const ii = this.state.data
    const spanItem = ii == null ? '':ii.discountList.map((v,index)=>{
            return (<div className='ProductDetail-pay'> 
                  <img className='ProductDetail-bottom-img' src={`${imgUrl}${v.icon}`}/>
                  <span className='ProductDetail-bottom-word'>{v.discountInfo}</span>
                    <span className='ProductDetail-btn'>购买</span>
            </div>)
    })
    return (
        <div>
            <div className='ProductDetail-first'>
                <img className='ProductDetail-img' src={require('../../images/1.jpg')}/>
                <span className='shopName'>{this.state.data==null?'':this.state.data.shopName}</span>
                <span className='timeWord'>{this.state.data==null?'':this.state.data.openingTime+'-'+this.state.data.closingTime}</span>
                <div className='ProductDetail-postion'>
                    <img className='ProductDetail-postion-img' src={require('../../images/gps.png')}/>
                    <span >{this.state.data==null?'':this.state.data.locationGuidance}</span>
                    <img className='ProductDetail-icon' src={require('../../images/next.png')}/>
                </div>
                {spanItem}
            </div>
            <div className='ProductDetail-detail'>
                <span className='detail-title'>
                    餐厅介绍
                </span>
                <div dangerouslySetInnerHTML={this.createMarkup()} className='detail-html' />
            </div>
        </div>
    );
  }
}