import './valet.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import { hashHistory } from 'react-router';
import { createForm } from 'rc-form';
import { SearchBar, Tabs, Steps, List, Modal, Toast, Button, DatePicker, Picker, TextareaItem, InputItem,Icon,SegmentedControl } from 'antd-mobile';
import { district, provinceLite as province } from 'antd-mobile-demo-data';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {Fetcher} from '../../../../utils/fetch'
const {get, post} = Fetcher

const TabPane = Tabs.TabPane;
const Item = List.Item;
const Brief = Item.Brief;
const prompt = Modal.prompt;

function showToast(text) {
  Toast.info(text, 1);
}

class Subscribe extends Component {
    constructor (props) {
        super(props)
        this.state = {
            parkPoint: 0,
            visibleDetail:false,
        }
        this.handleOk = this.handleOk.bind(this);
        this.showDetail = this.showDetail.bind(this);
    }
    componentDidMount() {
        this.props.changeNav('订单详情',{},{text:'首页',func:()=>{
            hashHistory.push('/index')
        }});
    }

    showDetail () {
        const _this = this;
        const { visibleDetail } = this.state;
        const detail = $('.pay-status');
        const svg = $('.subscribe-detail').find('svg');
        if(!detail.is(':animated')){
            if(visibleDetail){
                svg.addClass('animated svg-reverse-ani')
                detail.animate({
                    minHeight:'0',
                    height:'0'
                },500,()=>{
                    detail.hide();
                    svg.removeClass('animated svg-ani svg-reverse-ani')
                    _this.setState({
                        visibleDetail: false
                    })
                })

            }else{
                detail.css({ display: 'flex' })
                svg.addClass('animated svg-ani')
                detail.animate({
                    minHeight:'0.88rem',
                    height:'0.88rem'
                },500,()=>{
                    _this.setState({
                        visibleDetail: true
                    })
                })
            }
        }
    }

    handleOk (e) {
        e.preventDefault();
        const value = this.props.form.getFieldsValue();
        console.log(value)
        showToast('预约成功!')
    }

    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div className='content'>
                <div className='subscribe-info'>
                    <h1 className='subscribe-ok'>预约成功!</h1>
                    <h6 className='subscribe-tip'>我们将尽快与您确认，请留意短信通知</h6>
                </div>
                <SegmentedControl
                    className='sub-segment'
                    values={['订单信息', '车况']}
                    onChange={this.onChange}
                    onValueChange={this.onValueChange}
                />
                <List className='subscribe-order'>
                    <Item extra='201787464878'>订单号</Item>
                    <Item extra='2017-08-07 10:29'>购买日期</Item>
                    <Item extra={<span><span className='subscribe-detail' style={{color:'#00aca0'}} onClick={this.showDetail}>明细<Icon type='down' /></span><span style={{color:'red'}}>未支付</span></span>}>支付状态</Item>
                    <Item extra='￥10' className='pay-status'>停车费<span className='subscribe-status'>{'1小时'}</span></Item>
                </List>
                <List className='subscribe-order subscribe-park'>
                    <Item extra='2017-08-07 10:29'>泊车时间</Item>
                    <Item extra='CZ3212'>出发航班</Item>
                    <Item extra='待定'>取车时间</Item>
                    {/*<Item extra='待定'>回程航班</Item>*/}
                </List>
                <List className='subscribe-order subscribe-self'>
                    <Item extra='冯广健'>姓名</Item>
                    <Item extra='185-8875-0623'>电话</Item>
                    <Item extra='粤A·9999'>车牌号</Item>
                </List>
                <div className='subscribe-btn'>
                    {/*<Button type="ghost" inline size="small" style={{ marginRight: '0.08rem' }}>修改</Button>*/}
                    <Button type="ghost" inline size="small" style={{ marginRight: '0.08rem' }}>取消</Button>
                </div>
            </div>
        )
    }
}

export default createForm()(Subscribe)