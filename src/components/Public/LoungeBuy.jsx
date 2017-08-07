import './index.less'
import React from 'react';
import {ListView, SwipeAction, Button,InputItem } from 'antd-mobile';
import { hashHistory } from 'react-router';
import $ from 'jquery'
import moment from 'moment'
import {serverUrl,serverUrl1,imgUrl} from '../../utils/utils'
import {Fetcher} from '../../utils/fetch'
import { createForm } from 'rc-form';

const {get, post} = Fetcher
class LoungeBuy extends React.Component {
    state = {
        data: null,
        price:0.00,
    }
    componentDidMount() {
        const _this = this
        this.getDetail()
    }
    getDetail=()=>{
        const _this = this
        get(serverUrl1+'airport-product/getLoungeDetailForWeChat',{loungeId:_this.props.params.id}).then(
            result => {
                console.log(result)
                _this.setState({
                    data:result.data,
                })
            }
        )
    }
  render() {
    const _this = this
    const { getFieldProps } = this.props.form;
    const ii = this.state.data
    return (
        <div className='LoungeBuy-body'>
            <div className='LoungeBuy-top'>
                <div className='LoungeBuy-card'>
                    <img className='LoungeBuy-img' src={`${ii==null?"":ii.imgUrl}`}/>
                </div>
            </div>
        </div>
    );
  }
}

export default createForm()(LoungeBuy);