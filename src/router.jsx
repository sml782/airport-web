import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers/index'


import Index from './components/index';
import App from './components/App';
import PersonalSettings from './components/Login/personalSettings';//个人页面
import MyFlight from './components/Login/myFlight/index';//我的航班页面
import MyBalance from './components/Login/myBalance/index';//我的余额页面
import MyFeedback from './components/Login/myFeedback/index';//意见反馈页面
import MySet from './components/Login/mySet/index';//设置页面
import MyOrder from './components/Login/myOrder/index';//设置页面
import MyPay from './components/Login/myPay/index';//设置页面
import MyUse from './components/Login/myUse/index';//设置页面

import SailingPlay from './components/SailingPlay/index';//航会玩页面
import BigEvent from './components/SailingPlay/BigEvent/index';//大事件页面
import SpecialAbilityToPlay from './components/SailingPlay/SpecialAbilityToPlay/index';//特能玩页面
import StrollAround from './components/SailingPlay/StrollAround/index';//特能逛页面
import Detail from './components/SailingPlay/Detail/index';//详情页面
import ProductDetail from './components/Public/ProductDetail';//详情页面

import SearchFlight from './components/Flight/SearchFlight';//航班查询

import PublicService from './components/PublicService/PublicService';//公共服务
import ServiceList from './components/PublicService/ServiceList';//服务列表
import ServiceDetail from './components/PublicService/ServiceDetail';//服务详情

const store = createStore(reducer)

export default (
  <Provider store={store}>
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Index} />
            <Route path="index" component={Index} />
            <Route path="personalSettings" component={PersonalSettings} />
            <Route path="myFlight" component={MyFlight} />
            <Route path="myBalance" component={MyBalance} />
            <Route path="myFeedback" component={MyFeedback} />
            <Route path="mySet" component={MySet} />
            <Route path="myOrder" component={MyOrder} />
            <Route path="myPay" component={MyPay} />
            <Route path="myUse" component={MyUse} />
            <Route path="sailingPlay" component={SailingPlay} />
            <Route path="bigEvent" component={BigEvent} />
            <Route path="specialAbilityToPlay" component={SpecialAbilityToPlay} />
            <Route path="strollAround" component={StrollAround} />
            <Route path="detail/:id" component={Detail} />
            <Route path="productDetail/:id" component={ProductDetail} />

            {
              // 航班
            }
            <Route path="searchFlight" component={SearchFlight} />
            
            {
              // 公共服务
            }
            <Route path="publicService" component={PublicService} />
            <Route path="serviceList/:id/:isParent/:serviceName" component={ServiceList} />
            <Route path="serviceDetail/:id/:isParent/:serviceName" component={ServiceDetail} />
        </Route>
    </Router>
  </Provider>
)