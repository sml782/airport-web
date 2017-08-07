import './flight.less'
import React from 'react';
import { createForm } from 'rc-form';
import moment from 'moment'; // moment.min ~= 48kb
import { Picker, DatePicker, List, Checkbox,InputItem,Button } from 'antd-mobile';
import { hashHistory } from 'react-router';

const CheckboxItem = Checkbox.CheckboxItem;

class SearchFlight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }
  componentWillMount() {
    
  }
  componentDidMount() {
    this.props.changeTitle('航班结果');
    this.props.changeRight('完成');
  }

  //焦点获得
  focus=()=>{
      hashHistory.push('/selectAirport');
  }

  //提交
  submit=()=>{
      console.log(this.props.form.getFieldsValue('flightLand'));
      this.props.form.validateFields((error,value)=>{
          console.log(value);
      })
  }
  

  render() {
      const { getFieldProps,getFieldError  } = this.props.form;
      let errors;
      return (
          <div className="form">
            <List renderHeader={() => <b></b>}>
                <div style={{position:'relative'}}>
                    <InputItem {...getFieldProps('flightLaunch')} placeholder="请输入起飞地点" onFocus={this.focus}>
                        <img src={require('../../images/icon_flight_search_start.png')} />
                    </InputItem>
                    <img className="exchange-adress" src={require('../../images/icon-flight-switch.png')}  />
                    <InputItem {...getFieldProps('flightLand') } placeholder="请输入降落地点" onFocus={this.focus}>
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
                        <img src={require('../../images/airplane.png')} />
                    </InputItem>
                </div>
            </List>
            <List renderHeader={() => <b></b>}>
                <DatePicker
                    mode="date"
                    title="选择日期"
                    extra="可选,小于结束日期"
                    {...getFieldProps('date', { initialValue: moment() })}
                    minDate={moment('1970-01-01', 'YYYY-MM-DD')}
                    maxDate={moment('2090-12-31', 'YYYY-MM-DD')}
                    >
                    <List.Item arrow="horizontal">
                        <img src={require('../../images/icon_flight_search_date.png')} />
                    </List.Item>
                </DatePicker>
            </List>
             <p style={{marginLeft:'0.3rem'}}>航班日期请选择出发城市当地起飞日期<br/>如有中转请填写末班航班号</p>

              <Button className="btn" type="primary" style={{marginLeft:'0.3rem',marginRight:'0.3rem',background:'#00aca0'}} onClick={this.submit}>查询</Button>    
              

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
