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

const service = (data,func,isParent) =>  (
        <Item
          arrow="horizontal"
          multipleLine
          onClick={() => func(data.id,data.title,isParent)}
        >
          {data.title}
        </Item>
    )

class ServiceList extends Component {
    constructor(props){
        super(props);
        this.state = {
            serviceList:undefined,
        }
        this.getService = this.getService.bind(this);
        this.goService = this.goService.bind(this);
    }
    componentDidMount() {
        this.props.changeTitle(this.props.params.serviceName)
        const id = this.props.params.id;
        this.getService(id);
    }
    
    getService (id) {
        get(`${serverUrl2}public-service/getSerDetailForWeChat`,{serviceId:id,airportCode:'INC'}).then(data=>{
            console.log(data);
            this.setState({
                serviceList: data.data
            })
        })
    }

    goService (id,title,isParent) {
        hashHistory.push(`/serviceDetail/${id}/${isParent}/${title}`)
    }

    render() {
        const { isParent } = this.props.params;
        const { serviceList } = this.state;
        let serviceItem = null;
        if(serviceList){
            if(serviceList.length){
                serviceItem = serviceList.map((v,i)=>{
                    return service(v,this.goService,isParent)
                })
            }
        }
        return (
            <div className='content'>
                <List className="service-list">
                    {serviceItem}
                </List>
            </div>
        )
    }
}
export default ServiceList