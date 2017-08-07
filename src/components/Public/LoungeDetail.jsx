import './index.less'
import React from 'react';
import {ListView, SwipeAction, Button } from 'antd-mobile';
import $ from 'jquery'
import moment from 'moment'
import { hashHistory } from 'react-router';
import {Fetcher} from '../../utils/fetch'
import {serverUrl,serverUrl1,imgUrl} from '../../utils/utils'
import ProductComment from './ProductComment'

const {get, post} = Fetcher
export default class ListItem extends React.Component {
    state = {
        data: null,
        comment:null
    }
    componentDidMount() {
        this.getDetail()
        this.props.changeTitle('休息室');
    }
    componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps == null ?[]:nextProps.data});
    }
    getDetail=()=>{
        const _this = this
        get(serverUrl1+'airport-product/getLoungeDetailForWeChat',{loungeId:_this.props.params.id}).then(
            result => {
                console.log(result)
                _this.setState({
                    data:result.data,
                })
            }
        )
    }
    intoBuy=()=>{
        console.log(this.state.data.id)
        hashHistory.push(`LoungeBuy/${this.state.data.proLoungeId}`)
    }
    createMarkup=()=>{
        return {__html:  this.state.data==null?'':this.state.data.shopDescription};
    }
  render() {
    const ii = this.state.data
    return (
        <div>
            <div className='ProductDetail-first' style={{height:1700}}>
                <img className='ProductDetail-img' src={require('../../images/1.jpg')}/>
                <span className='shopName'>{this.state.data==null?'':this.state.data.loungeName}</span>
                <span className='timeWord'>{this.state.data==null?'':this.state.data.businessHours}</span>
                <div className='ProductDetail-postion'>
                    <img className='ProductDetail-postion-img' src={require('../../images/gps.png')}/>
                    <span >{this.state.data==null?'':this.state.data.locationGuide}</span>
                    <img className='ProductDetail-icon' src={require('../../images/next.png')}/>
                </div>
                <div className='ProductDetail-pay'> 
                    <img className='ProductDetail-bottom-img' src={`${imgUrl}mai.png`}/>
                    <span className='ProductDetail-bottom-word'>购买凭证</span>
                    <span className='ProductDetail-btn' onClick={this.intoBuy}>购买</span>
                </div>
                <div className='ProductDetail-pay' style={{borderTop:'1px dashed #e3e8ee'}}> 
                    <img className='ProductDetail-bottom-img' src={`${imgUrl}pingzheng.png`}/>
                    <span className='ProductDetail-bottom-word'>使用我的凭证</span>
                    <span className='ProductDetail-btn'>使用</span>
                </div>
            </div>
            {/* <div className='ProductDetail-detail'>
                <span className='detail-title'>
                    餐厅介绍
                </span>
                <div dangerouslySetInnerHTML={this.createMarkup()} className='detail-html' />
            </div> */}

        </div>
    );
  }
}