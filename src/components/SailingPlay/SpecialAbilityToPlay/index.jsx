import './index.less'
import React from 'react';
import $ from 'jquery';
import {
  SearchBar, Tabs, Steps,List
} from 'antd-mobile';
import {Fetcher} from '../../../utils/fetch'
import {serverUrl,serverUrl1} from '../../../utils/utils'
import ListItem from '../../Public/ListItem'

const {get, post} = Fetcher
const TabPane = Tabs.TabPane;
const Item = List.Item;
const Brief = Item.Brief;


export default class MyBalanceDemo extends React.Component {
  constructor(props) {
        super(props)
        this.state = {
           list:null,
           firstList:null,
        }
    }
  componentDidMount() {
    this.props.changeTitle('特能玩');
    this.getList()
  }

  getList=()=>{
    const _this = this
    get(serverUrl+'airport-article/getArticleList',{type:'2',airportCode:'HGH'}).then(
        result => {
            _this.setState({
                list:result.data.rows,
                firstList:result.data.rows[0]
            })
        }
    )
  }
  render() {
    const listItem = this.state.list==null?'':this.state.list.map((v,index)=>{
        if(index != 0){
            return <ListItem data={v}></ListItem>
        } 
    })
    return (<div id='aaa' style={{ marginBottom: 30 }}>
         <img className='bigEvent-img' src={require('../../../images/title_img2.png')}/>
         <span className='bigEvent-word'>小编带你嗨翻机场，玩转机场周边</span>
         <img className='bigEvent-firstImg' src={`${this.state.firstList==null?'':this.state.firstList.imgUrl}`}/>
         <span className='bigEvent-firstWord'>{this.state.firstList==null?'':this.state.firstList.title}</span>
         <div style={{display:this.state.list==null?'none':''}}>
            <ListItem data={this.state.list==null?'':this.state.list}></ListItem>
         </div>
    </div>);
  }
}
