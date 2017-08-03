import './flight.less'
import React from 'react';
import { createForm } from 'rc-form';
import moment from 'moment'; // moment.min ~= 48kb
import { district } from 'antd-mobile-demo-data';

import { Picker, DatePicker, List, Checkbox,InputItem,Button } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';

import { createStore } from 'redux'
import counter from '../../reducers/index'

const CheckboxItem = Checkbox.CheckboxItem;

const store = createStore(counter)
// 如果不是使用 List.Item 作为 children
const CustomChildren = (props) => {
  return (
    <div
      onClick={props.onClick}
      style={{ backgroundColor: '#fff', height: '0.9rem', lineHeight: '0.9rem', padding: '0 0.3rem' }}
    >
      {props.children}
      <span style={{ float: 'right' }}>{props.extra}</span>
    </div>
  );
};

class SearchFlight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerValue: [],
      dpValue: null,
    };
  }
  componentWillMount() {
    console.log(store.getState())
  }
  componentDidMount() {
    store.dispatch({ type: 'INCREMENT' })
    console.log(store.getState())
    this.props.changeTitle('航班查询');
  }
  render() {
      const { getFieldProps } = this.props.form;
      const { pickerValue, dpValue } = this.state;
      return (
          <div className="form">
            <List renderHeader={() => <b></b>}>
                <div style={{position:'relative'}}>
                    <InputItem
                        {...getFieldProps('flightLaunch') }
                        placeholder="请输入起飞地点"
                        >
                        <img src={require('../../images/icon_flight_search_start.png')} />
                    </InputItem>
                    <img className="exchange-adress" src={require('../../images/du.png')}  />
                    <InputItem
                        {...getFieldProps('flightLand') }
                        placeholder="请输入降落地点"
                        >
                        <img src={require('../../images/icon_flight_search_end.png')} />
                    </InputItem>
                </div>
                <div className="flight-no">
                    <div className="lines">
                        <div className="left line"></div>
                        <div className="left">或</div>
                        <div className="left line"></div>
                    </div>
                    <InputItem {...getFieldProps('flightNo') } placeholder="输入航班号查询" >
                        <img src={require('../../images/icon_flight_search_plane.png')} />
                    </InputItem>
                </div>
            </List>
            <List renderHeader={() => <b></b>}>
                <DatePicker
                    mode="date"
                    title="选择日期"
                    extra="可选,小于结束日期"
                    {...getFieldProps('date1', { initialValue: moment() })}
                    minDate={moment('1970-01-01', 'YYYY-MM-DD')}
                    maxDate={moment('2090-12-31', 'YYYY-MM-DD')}
                    >
                    <List.Item arrow="horizontal">
                        <img src={require('../../images/icon_flight_search_date.png')} />
                    </List.Item>
                </DatePicker>
            </List>
             <p style={{marginLeft:'0.3rem'}}>航班日期请选择出发城市当地起飞日期<br/>如有中转请填写末班航班号</p>

              <Button className="btn" type="primary" style={{marginLeft:'0.3rem',marginRight:'0.3rem'}}>查询</Button>    
              

                <div className="flight-no">
                    <div className="lines">
                        <div className="left line"></div>
                        <div className="left">历史记录</div>
                        <div className="left line"></div>
                    </div>
                    <p className="tc" style={{marginTop:50,height:80,lineHeight:'80px'}}>清除记录</p>
                </div>

          </div>
      );
  }
}

export default createForm()(SearchFlight);
