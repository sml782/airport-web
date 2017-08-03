import './publicService.less';
import React, { Component } from 'react';
import $ from 'jquery';
import { hashHistory } from 'react-router';
import { SearchBar, Tabs, Steps, List, Modal, Toast, Grid } from 'antd-mobile';
import { Fetcher } from '../../utils/fetch';
import { serverUrl2 } from '../../utils/utils';

const Item = List.Item;
const Brief = Item.Brief;

const { get, post } = Fetcher;

const service = (data) =>  (
        <Item
          multipleLine
        >
            <div className='point-content'>
                <span>{data.servicePointName}</span>
                <span><Icon type="right" />服务位置:<Brief>{data.position}</Brief></span>
                <span><Icon type="right" />电话:<Brief>{data.phone}</Brief></span>
                <span><Icon type="right" />电话:<Brief>{data.phone}</Brief></span>
                <span><Icon type="right" />营业时间:<Brief>{data.businessHours}</Brief></span>
                {data.servicePointContent !== '' && <span><Icon type="right" />服务内容:<Brief>{data.businessHours}</Brief></span>}
                {data.link !== '' && <span><Icon type="right" />链接:<a href={data.businessHours}><Brief>{data.businessHours}</Brief></a></span>}
                {data.pictureUrl !== '' && <span className='point-img-list'>{data.pictureUrl.split(';').map((v,i)=>{
                    return <img src={v} />
                })}</span> }
            </div>
        </Item>
    )

class ServiceDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            serviceDetail:null,
        }
        this.getService = this.getService.bind(this);
    }
    componentDidMount() {
        this.props.changeTitle(this.props.params.serviceName)
        const {id,isParent} = this.props.params;
        this.getService(id, isParent);
        console.log(1)
    }
    
    getService (id, isParent) {
        let sid = 'serviceId'
        if(isParent){
            sid = 'serviceDetailId'
        }
        get(`${serverUrl2}public-service/getSerDetailForWeChat`,{[sid]:id,airportCode:'INC'}).then(data=>{
            this.setState({
                serviceDetail: data.data
            })
        })
    }

    createMarkup=()=>{
        return {__html:  this.state.serviceDetail==null?'':this.state.serviceDetail.explainDesc};
    }

    render() {
        const { serviceDetail } = this.state;
        console.log(serviceDetail)
        let serviceItem = null;
        if(serviceDetail.hasServicePoint){
            serviceItem = serviceDetail.servicePointList.map((v,i)=>{
                return service(v)
            })
        }
        return (
            <div className='content'>
                <div dangerouslySetInnerHTML={this.createMarkup()} className='detail-body' />
                <List renderHeader={() => <span className='point-title'>服务点</span>} className="service-list">
                    {serviceItem}
                </List>
            </div>
        )
    }
}
export default ServiceDetail