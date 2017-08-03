import './personalSettings.less';
import React from 'react';
import $ from 'jquery';
import { hashHistory } from 'react-router';
import {
  SearchBar, Tabs, Steps,List,Modal,Toast
} from 'antd-mobile';

const TabPane = Tabs.TabPane;
const Item = List.Item;
const Brief = Item.Brief;
const prompt = Modal.prompt;


export default class Demo extends React.Component {
  componentDidMount() {
    this.props.changeTitle('个人中心');
    $('.am-navbar-light').addClass('person-nav-color')

  }
  intoSet =()=>{
    hashHistory.push('mySet')
  }
  intopay =()=>{
    hashHistory.push('myPay')
  }
  intoUse =()=>{
    hashHistory.push('myUse')
  }
  intoOrder =()=>{
    hashHistory.push('myOrder')

  }
  render() {
    return (<div id='aaa' style={{ marginBottom: 30 }}>
          <div className='person-top'>
                <span className='top-img' onClick={this.intoSet}><img src={require('../../images/driver-portrait.png')} /></span>
                <span className='top-word'>BoomBoomBoom</span>
          </div>
          <div className='person-buy'>
              <span onClick={this.intopay}><img className='buy-img' src={require('../../images/icon_usercenter_dfk.png')} />代付款</span>
              <span onClick={this.intoUse}><img className='buy-img' src={require('../../images/icon_usercenter_wsy.png')} />未使用</span>
              <span onClick={this.intoOrder}><img className='buy-img' src={require('../../images/icon_usercenter_qbord.png')} />全部订单</span>
          </div>
           <Item
            arrow="horizontal"
            className='person-list'
            style={{marginTop:'48px'}}
            onClick={() => {hashHistory.push('myFlight')}}
          >我的航班</Item>
          <Item
            arrow="horizontal"
            onClick={() => {}}
            className='person-list-bottom'
          >智能客服</Item>
          <Item
            arrow="horizontal"
            style={{marginTop:'48px'}}
            className='person-list'
            onClick={() => {hashHistory.push('myBalance')}}
          >我的余额</Item>
          <Item
            arrow="horizontal"
            onClick={() => prompt('兑换码', '请输入兑换码!', [
              { text: '取消' },
              { text: '提交', onPress: value => console.log(`输入的内容:${value}`) },
            ], 'plain-text')}
            className='person-list-bottom'
          >兑换码</Item>
           <Item
            arrow="horizontal"
            style={{marginTop:'48px'}}
            className='person-list'
            onClick={() => {hashHistory.push('myFeedback')}}
          >意见反馈</Item>
          
          <Item
            arrow="horizontal"
            onClick={() => {hashHistory.push('mySet')}}
          >设置</Item>
    </div>);
  }
}
