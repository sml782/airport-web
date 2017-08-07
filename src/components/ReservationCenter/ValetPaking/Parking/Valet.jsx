import './valet.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import { hashHistory } from 'react-router';
import { createForm } from 'rc-form';
import { SearchBar, Tabs, Steps, List, Modal, Toast, Button, DatePicker, Picker, TextareaItem, InputItem } from 'antd-mobile';
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

class ValetPaking extends Component {
    constructor (props) {
        super(props)
        this.state = {
            parkPoint: 0
        }
        this.handleOk = this.handleOk.bind(this);
    }
    componentDidMount() {
        this.props.changeTitle('代客泊车');
        this.props.changeRight('首页');
    }

    handleOk (e) {
        e.preventDefault();
        const value = this.props.form.getFieldsValue();
        console.log(value)
        showToast('预约成功!')
        hashHistory.push('/subscribe')
    }

    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div className='content'>
                <div className='parking-info'>
                    <div className='info-title'>
                        <span className='info-name'>泊车信息</span>
                    </div>
                    <List>
                        <Picker data={district} cols={1} {...getFieldProps('parkingAddress')}>
                            <List.Item arrow="horizontal">约会点</List.Item>
                        </Picker>
                        <DatePicker className=" "
                            mode="datetime"
                            onChange={this.onChange}
                            value={this.state.date}
                            {...getFieldProps('vletTime')}
                        >
                            <Item arrow="horizontal">泊车时间</Item>
                        </DatePicker>
                        <InputItem
                            {...getFieldProps('flight')}
                            clear
                        >出发航班</InputItem>
                        <DatePicker className=""
                            mode="datetime"
                            onChange={this.onChange}
                            value={this.state.date}
                            {...getFieldProps('pickTime')}
                        >
                            <Item arrow="horizontal">取车时间</Item>
                        </DatePicker>
                        {/*<DatePicker className=""
                            mode="datetime"
                            onChange={this.onChange}
                            value={this.state.date}
                            {...getFieldProps('returnTime')}
                        >
                            <Item arrow="horizontal">回程时间</Item>
                        </DatePicker>*/}
                    </List>
                </div>
                <div className='parking-info passenger-info'>
                    <div className='info-title'>
                        <span className='info-name'>泊车信息</span>
                    </div>
                    <List>
                        <InputItem
                            {...getFieldProps('name')}
                            clear
                        >姓名</InputItem>
                        <InputItem
                            {...getFieldProps('phone')}
                            clear
                        >手机号码</InputItem>
                        <InputItem
                            {...getFieldProps('plateNo')}
                            clear
                        >车牌号</InputItem>
                    </List>
                </div>
                <div className='parking-info remark-info'>
                    <div className='info-title'>
                        <span className='info-name'>备注</span>
                    </div>
                    <List>
                        <TextareaItem
                            {...getFieldProps('remark')}
                            rows={5}
                            count={100}
                        />
                    </List>
                    <Button onClick={this.handleOk} className='parking-info-btn' type='primary'>确认提交</Button>
                </div>
            </div>
        )
    }
}

export default createForm()(ValetPaking)