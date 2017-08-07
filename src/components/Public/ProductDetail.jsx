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
        this.getComent()
        this.props.changeTitle('餐厅');
    }
    componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps == null ?[]:nextProps.data});
    }
    getDetail=()=>{
        const _this = this
        get(serverUrl1+'airport-product/getFlashDetailForWeChat',{shopId:_this.props.params.id}).then(
            result => {
                _this.setState({
                    data:result.data,
                })
            }
        )
    }
    getComent=()=>{
        const _this = this
        get(serverUrl1+'airport-article/getCommentList',{rootId:_this.props.params.id,type:2}).then(
            result => {
                _this.setState({
                    comment:result.data,
                    ListLength:result.data.total
                })
            }
        )
    }
    intoBuy=()=>{
        hashHistory.push(`productBuy/${this.state.data.id}`)
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
                    <span className='ProductDetail-btn' onClick={this.intoBuy}>买单</span>
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
                <span style={{display:this.state.data==null?"":this.state.data.discountList.length == 0 ? 'none':'block'}}>
                    {spanItem}
                </span>
            </div>
            <div className='ProductDetail-detail'>
                <span className='detail-title'>
                    餐厅介绍
                </span>
                <div dangerouslySetInnerHTML={this.createMarkup()} className='detail-html' />
            </div>
            <div className='ProductDetail-comment'>
                <div className='ProductDetail-comment-top'>
                    <img src={require('../../images/comment_icon.png')} className='comment-icon'/>
                    <span className='user-comment'>用户评论<span>({this.state.ListLength})</span></span>
                    <img src={require('../../images/enter_l.png')} className='comment-enter'/>
                    <span className='look-comment'>查看全部评论</span>
                </div>
                <ProductComment data={this.state.comment}/>
            </div>
            <div className='ProductDetail-addComent'>
                    <img src={require('../../images/b_comment_icon.png')}/>
                    <span>添加评论</span>
            </div>

        </div>
    );
  }
}