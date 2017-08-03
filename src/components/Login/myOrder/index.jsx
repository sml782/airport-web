import './index.less'
import React from 'react';
import $ from 'jquery';
import {
  SearchBar, Tabs, Steps,List
} from 'antd-mobile';

const TabPane = Tabs.TabPane;
const Item = List.Item;
const Brief = Item.Brief;


export default class MyBalanceDemo extends React.Component {
  componentDidMount() {
    this.props.changeTitle('全部订单');

  }
  render() {
    return (<div id='aaa' style={{ marginBottom: 30 }}>
         <span className='flight-none'>您还没有关注航班，快去关注吧！</span>
    </div>);
  }
}
