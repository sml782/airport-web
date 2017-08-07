import './index.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import { hashHistory } from 'react-router';
import { SearchBar, Tabs, Steps, List, Modal, Toast } from 'antd-mobile';
import {Fetcher} from '../../utils/fetch'
import {serverUrl,serverUrl1,imgUrl} from '../../utils/utils'
const {get, post} = Fetcher

const TabPane = Tabs.TabPane;
const Item = List.Item;
const Brief = Item.Brief;
const prompt = Modal.prompt;


class PublicService extends Component {
    componentDidMount() {
        this.props.changeTitle('预定中心');
    }
    intoChange =()=>{

    }
    intoLounge =()=>{
        hashHistory.push('lounge')
    }
    
    render() {
        return (
            <div className='content'>
                <List className="reservation-list">
                    <Item arrow="horizontal" onClick={this.intoChange} thumb={`${imgUrl}icon_exchange.png`} multipleLine>
                        货币兑换 <Brief>实时汇率查询换算,在线世界各国货币转换</Brief>
                    </Item>
                    <Item arrow="horizontal" thumb={`${imgUrl}icon_hotel.png`} multipleLine>
                        机场周边酒店 <Brief>轻松预定机场周边、市区各类酒店</Brief>
                    </Item>
                    <Item arrow="horizontal" thumb={`${imgUrl}icon_car.png`} multipleLine>
                        专车 <Brief>一口价接送机,正规发票</Brief>
                    </Item>
                    <Item arrow="horizontal" thumb={`${imgUrl}icon_bus.png`} multipleLine>
                        空港快线 <Brief>快速预定购票,享受快人一步</Brief>
                    </Item>
                    <Item arrow="horizontal" onClick={()=>hashHistory.push('/valetParking')} thumb={`${imgUrl}icon_parking.png`} multipleLine>
                        代客泊车 <Brief>提前预约泊车,专人服务,不用浪费找位...</Brief>
                    </Item>
                    <Item arrow="horizontal" onClick={this.intoLounge} thumb={`${imgUrl}icon_lounge.png`} multipleLine>
                        休息室预定 <Brief>安静舒适的候机环境</Brief>
                    </Item>
                    <Item arrow="horizontal" thumb={`${imgUrl}icon_special.png`} multipleLine>
                        特殊旅客服务 <Brief>认真对待每一位旅客</Brief>
                    </Item>
                    <Item arrow="horizontal" thumb={`${imgUrl}icon_gold_card.png`} multipleLine>
                        常旅客金卡会员预定 <Brief>让您在机场畅行无阻</Brief>
                    </Item>
                </List>
            </div>
        )
    }
}
export default connect()(PublicService)