import './publicService.less';
import React, { Component } from 'react';
import $ from 'jquery';
import { hashHistory } from 'react-router';
import { SearchBar, Tabs, Steps, List, Modal, Toast, Grid } from 'antd-mobile';
import { Fetcher } from '../../utils/fetch';
import { serverUrl2 } from '../../utils/utils';

const TabPane = Tabs.TabPane;
const Item = List.Item;
const Brief = Item.Brief;
const prompt = Modal.prompt;

const { get, post } = Fetcher;

const service = (func,data,sn) => {
    let serviceName = '常用服务';
    sn ? serviceName = sn : serviceName;
    return (
        <div className='service-list'>
            <div className='service-title'>
                <span className='service-name'>{serviceName}</span>
            </div>
            <div className='service-bar'>
                <Grid 
                    data={data}
                    onClick={data=>func(data)}
                    columnNum={4}
                    hasLine={false}
                    renderItem={(data,i) => {
                        return (
                            <div>
                                <div style={{padding:'.2rem'}}>
                                    <img src={data.iconUrl} style={{ width: '.8rem', height: '.8rem' }} alt={data.labelName} />
                                    <div style={{ fontSize: '0.24rem', marginTop: '0.2rem' }}>
                                        <span>{data.labelName}</span>
                                    </div>
                                </div>
                            </div>
                    )}}
                />
            </div>
        </div>
    )
}

class PublicService extends Component {
    constructor(props){
        super(props);
        this.state = {
            serviceList:undefined,
            labelList:[],
        }
        this.getService = this.getService.bind(this);
        this.goService = this.goService.bind(this);
    }
    componentDidMount() {
        this.props.changeTitle('服务大厅');
        this.props.changeLeft('←');
        this.props.changeRight('首页');
        this.getService();
    }
    
    getService () {
        get(`${serverUrl2}public-service/getSerListForWeChat`,{airportCode:'INC'}).then(data=>{
            console.log(data);
            this.setState({
                serviceList: data.data
            })
        })
    }

    goService (m) {
        if(m.isParent){
            hashHistory.push(`/serviceList/${m.id}/${m.isParent}/${m.labelName}`)
        } else {
            hashHistory.push(`/serviceDetail/${m.id}/${m.isParent}/${m.labelName}`)
        }
    }

    render() {
        const { serviceList } = this.state;
        let hotService = null,serviceTotal = null;
        if(serviceList){
            if(serviceList.hotList){
                hotService = service(this.goService, serviceList.hotList)
            }
            if(serviceList.labelList && serviceList.serviceList){
                serviceTotal = serviceList.labelList.map((v,i) => service(this.goService, serviceList.serviceList[v.id], v.labelName))
            }
        }
        return (
            <div className='content'>
                {hotService}
                {serviceTotal}
            </div>
        )
    }
}
export default PublicService