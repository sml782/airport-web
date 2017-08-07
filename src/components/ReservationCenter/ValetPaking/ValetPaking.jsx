import './valet.less'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import { hashHistory } from 'react-router';
import { SearchBar, Tabs, Steps, List, Modal, Toast, Button } from 'antd-mobile';
import {Fetcher} from '../../../utils/fetch'
const {get, post} = Fetcher

const TabPane = Tabs.TabPane;
const Item = List.Item;
const Brief = Item.Brief;
const prompt = Modal.prompt;


class ValetPaking extends Component {
    constructor (props) {
        super(props)
        this.state = {
            parkPoint: 0
        }
    }
    componentDidMount() {
        console.log(this.props)
        //this.props.changeTitle('代客泊车');
        // this.props.changeRight('服务流程')
    }
    componentWillReceiveProps(nextProps) {
        this.props.changeTitle('代客泊车');
    }
    changeParkPoint (e) {
        e.preventDefault();
        const selectBtn = $('.valet-park-btn').find('.airport-btn-select').text();
        const clickBtn = $(e.target).text();
        if(selectBtn !== clickBtn){
            console.log(1)
            $(e.target).addClass('airport-btn-select').siblings().removeClass('airport-btn-select');
        }
    }

    render() {
        return (
            <div className='content'>
                <div className='valet-pic'></div>
                <div className='valet-air'>
                    <h1><span>代客泊车</span></h1>
                    <div className='valet-air-port'>
                        <span className='valet-air-title'>服务机场</span>
                        <span className='valet-air-chang'>广州白云国际机场 </span>
                    </div>
                    <div className='valet-park'>
                        <span className='valet-park-title'>停车地点</span>
                        <div className='valet-park-btn'>
                            <a href='javascript:;' onClick={this.changeParkPoint} className='airport-btn airport-btn-select'>机场内</a>
                            <a href='javascript:;' onClick={this.changeParkPoint} className='airport-btn'>机场外</a>
                        </div>
                    </div>
                    <ul className='valet-tip'>
                        <li>
                            <span className='tip-title'>-停车费：</span>
                            <span>¥8.00/小时，¥60/天</span>
                        </li>
                        <li>
                            <span className='tip-title'>-服务费：</span>
                            <span>¥20，停车满24小时免服务费</span>
                        </li>
                    </ul>
                </div>
                <div className='enter-valet'>
                    <div className='valet-remark-title'>
                        <span className='remark-name'>使用说明</span>
                    </div>
                    <ul className='valet-remark-content'>
                        <li>提前2个小时预约泊车</li>
                        <li>确定回城航班后请提前预约取车</li>
                        <li>如回程信息有改，请致电客服修改取车时间</li>
                        <li>如超停，按实际停车时间加收超时费用</li>
                    </ul>
                    <Button onClick={()=>hashHistory.push('/valet')} className='enter-valet-btn' type='primary'>预约泊车</Button>
                </div>
            </div>
        )
    }
}
export default ValetPaking