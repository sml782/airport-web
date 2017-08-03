import './index.less'
import React from 'react';
import $ from 'jquery';
import {
  SearchBar, Tabs, Steps,List,TextareaItem,Button
} from 'antd-mobile';
import { createForm } from 'rc-form';

const TabPane = Tabs.TabPane;
const Item = List.Item;
const Brief = Item.Brief;


// const 

class MyBalanceDemo extends React.Component {
  componentDidMount() {
    this.props.changeTitle('意见反馈信息');

  }
  render() {
    const { getFieldProps } = this.props.form;
    return (<div id='aaa' style={{ marginBottom: 30 }}>
        <div className='feedBack-input'>       
         <TextareaItem
            {...getFieldProps('count', {
              initialValue: '我的意见是...',
            })}
            rows={5}
            count={100}
          />
        </div>
        <div className='feedBack-btn'>
        <Button className="btn " type="primary">提交</Button>
        </div>
    </div>);
  }
}

export default createForm()(MyBalanceDemo);
