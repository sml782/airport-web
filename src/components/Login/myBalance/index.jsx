import './index.less'
import React from 'react';
import $ from 'jquery';
import {
  SearchBar, Tabs, Steps,List,Icon
} from 'antd-mobile';

const TabPane = Tabs.TabPane;
const Item = List.Item;
const Brief = Item.Brief;
const Step = Steps.Step;



export default class myBalanceDemo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        balance:'123'
    };
  }
  componentDidMount() {
    this.props.changeTitle('我的余额');

  }
  render() {
    return (<div id='aaa' style={{ marginBottom: 30 }}>
        <div className='balance-img'>
            <span className='balance-cash'>￥{this.state.balance}</span>
        </div>
        {/* <Steps>
            <Step status="finish" title="步骤1" icon={<Icon type={require('./pay-circle.svg')} />} />
            <Step status="process" title="步骤2" icon={<Icon type={require('./pay-circle.svg')} />} />
            <Step status="error" title="步骤3" icon={<Icon type={require('./pay-circle.svg')} />} />
        </Steps> */}

        <span className='balance-result'><img src={require('../../../images/green_title_icon.png')}/>消费记录</span>
        <Steps current={3} className='balance-list'>
            <Step title="第一步" />
            <Step title="第二步" />
            <Step title="第三步" />
        </Steps>
    </div>);
  }
}
