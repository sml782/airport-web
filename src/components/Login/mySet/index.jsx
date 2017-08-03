import '../personalSettings.less';
import React from 'react';
import $ from 'jquery';
import { hashHistory } from 'react-router';
import {
  SearchBar, Tabs, Steps,List,Modal,Toast,InputItem,Picker
} from 'antd-mobile';
import { createForm } from 'rc-form';

const TabPane = Tabs.TabPane;
const Item = List.Item;
const Brief = Item.Brief;
const prompt = Modal.prompt;
const district= [
    {
      label: '男',
      value: '男',
    },
    {
      label: '女',
      value: '女',
    }
];

class Demo extends React.Component {
  componentDidMount() {
    this.props.changeTitle('个人中心');
    $('.am-navbar-light').addClass('person-nav-color')

  }
  render() {
      const { getFieldProps } = this.props.form;
    return (<div id='aaa' style={{ marginBottom: 30 }}>
          <div className='person-top'>
                <span className='top-img'><img src={require('../../../images/driver-portrait.png')} /></span>
                <span className='top-word'>BoomBoomBoom</span>
          </div>
          <List>
            <Picker data={district} cols={1} {...getFieldProps('sex')} className="forss">
                <List.Item arrow="horizontal">性别</List.Item>
            </Picker>
            <InputItem
                {...getFieldProps('autofocus')}
                clear
                placeholder="你的年龄"
                autoFocus
            >年龄</InputItem>
            <InputItem
                {...getFieldProps('focus')}
                clear
                placeholder="你的所在地"
                onFocus={() => {
                this.setState({
                    focused: false,
                });
                }}
            >所在地</InputItem>
          </List>
           <List renderHeader={() => '个人身份信息'}>
            <InputItem
                {...getFieldProps('autofocus')}
                clear
                placeholder="请输入手机号!"
                autoFocus
            >手机号</InputItem>
            <InputItem
                {...getFieldProps('focus')}
                clear
                placeholder="请输入身份证!"
                onFocus={() => {
                }}
            >身份证</InputItem>
            <InputItem
                {...getFieldProps('focus')}
                clear
                placeholder="请输入护照号!"
                onFocus={() => {
                }}
            >护照号</InputItem>
            </List>
    </div>);
  }
}
export default createForm()(Demo);
