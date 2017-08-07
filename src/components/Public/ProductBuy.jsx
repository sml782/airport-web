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
class ProductBuy extends React.Component {
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
        get(serverUrl1+'airport-product/getFlashDetailForWeChat',{shopId:_this.props.params.id}).then(
            result => {
                _this.setState({
                    data:result.data,
                })
                _this.props.changeTitle(result.data.shopName);

            }
        )
    }
    changePrice = (val)=>{
        this.props.form.setFieldsValue({
            money2:val,
        })
        this.setState({
            price:val,
        })
    }
  render() {
    const _this = this
    const { getFieldProps } = this.props.form;
    const ii = this.state.data
    let discount = 0
    const spanItem = ii == null ? '':ii.discountList.map((v,index)=>{
            discount = v.discount
            return (<div className='ProductDetail-pay'> 
                  <img className='ProductDetail-bottom-img' src={`${imgUrl}${v.icon}`}/>
                  <span className='ProductDetail-bottom-word'>{v.discountInfo}</span>
                  <span className='ProductDetail-bottom-price'>{`-￥${this.state.price*(1-v.discount).toFixed(2)}`}</span>
            </div>)
    })
    const price = discount*this.state.price
    return (
        <div className='ProductBuy-body'>
            <span className='ProductBuy-word'>请输入消费金额</span>
            <div className='ProductBuy-momey'>
                <span>￥</span>
                <InputItem
                    {...getFieldProps('money2', {
                    normalize: (v, prev) => {
                        if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                        if (v === '.') {
                            return '0.';
                        }
                        return prev;
                        }
                        return v;
                    },
                    })}
                    maxLength={4}
                    type="money"
                    onFocus={() => {
                        this.setState({
                            moneyfocused: false,
                        });
                    }}
                    focused={this.state.moneyfocused}
                    onChange={this.changePrice}
                ></InputItem>
            </div>
            <div className='ProductBuy-pay'>
                    {spanItem}
            </div>
            <div className='ProductBuy-pay' style={{border:'none'}}> 
                  <img className='ProductDetail-bottom-img' src={require('../../images/coupon.png')}/>  
                  <span className='ProductDetail-bottom-word'>应付金额</span>
                  <span className='ProductDetail-bottom-price'>{`￥${price.toFixed(2)}`}</span>
            </div>
            <span className='ProductDetail-btn'>支付</span>
            <span className='ProductDetail-other'>注:请确认闪付的餐厅与您所在的餐厅一致</span>
        </div>
    );
  }
}

export default createForm()(ProductBuy);