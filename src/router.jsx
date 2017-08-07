import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux'
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
import ProductBuy from './components/Public/ProductBuy'

import SearchFlight from './components/Flight/SearchFlight';//航班查询
import SelectAirport from './components/Flight/SelectAirport';//选择机场
import FlightResult from './components/Flight/FlightResult';//航班结果

import PublicService from './components/PublicService/PublicService';//公共服务
import ServiceList from './components/PublicService/ServiceList';//服务列表
import ServiceDetail from './components/PublicService/ServiceDetail';//服务详情

import ReservationCenter from './components/ReservationCenter/index';//预定中心
import Lounge from './components/ReservationCenter/Lounge'//休息室

import LoungeDetail from './components/Public/LoungeDetail';//详情页面
import LoungeBuy from './components/Public/LoungeBuy'

import ValetParking from './components/ReservationCenter/ValetPaking/ValetPaking';//代客泊车
import Valet from './components/ReservationCenter/ValetPaking/Parking/Valet';//预约泊车
import Subscribe from './components/ReservationCenter/ValetPaking/Parking/Subscribe';//预约成功

const store = createStore(reducer)
if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers/index', () => {
      const nextReducer = require('./reducers/index')
      store.replaceReducer(nextReducer)
    })
  }
//const history = syncHistoryWithStore( hashHistory, store )

//history.listen(location => analyticsService.track(location.pathname))

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
            <Route path="productBuy/:id" component={ProductBuy} />
            {
              //预定中心
            }
            <Route path="reservationCenter" component={ReservationCenter} />
            <Route path="lounge" component={Lounge} />
            <Route path="loungeDetail/:id" component={LoungeDetail} />
            <Route path="LoungeBuy/:id" component={LoungeBuy} />

            <Route path="valetParking" component={ValetParking} />
            <Route path="valet" component={Valet} />
            <Route path="subscribe" component={Subscribe} />
            {
              // 航班
            }
            <Route path="searchFlight" component={SearchFlight} />
            <Route path="selectAirport" component={SelectAirport} />
            <Route path="flightResult" component={FlightResult} />
            
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