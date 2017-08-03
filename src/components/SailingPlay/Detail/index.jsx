import './index.less'
import React from 'react';
import $ from 'jquery';
import {
  SearchBar, Tabs, Steps,List
} from 'antd-mobile';
import {Fetcher} from '../../../utils/fetch'
import {serverUrl,serverUrl1} from '../../../utils/utils'
import DetailList from '../../Public/DetailList'

const {get, post} = Fetcher
const TabPane = Tabs.TabPane;
const Item = List.Item;
const Brief = Item.Brief;


export default class MyBalanceDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        data:null,
        detailList:null,

    }
  }
  componentDidMount() {
        this.getList()
        this.getComent()
  }

  getList=()=>{
    const _this = this
    get(serverUrl+'airport-article/getArticleById',{id:_this.props.params.id}).then(
        result => {
            _this.setState({
                data:result.data,
            })
            _this.props.changeTitle(result.data.title);
        }
    )
  }
  getComent=()=>{
    const _this = this
    get(serverUrl+'airport-article/getCommentList',{rootId:_this.props.params.id}).then(
        result => {
            //console.log(result)
            _this.setState({
                detailList:result.data,
            })
        }
    )
  }

  createMarkup=()=>{
    return {__html:  this.state.data==null?'':this.state.data.content};
  }
  Publishing=()=>{
      
  }
  render() {
    return (<div id='aaa' style={{ marginBottom: 120 }}>
        <div dangerouslySetInnerHTML={this.createMarkup()} className='detail-body' />
        <div className='detail-comment' >
            <span className='detail-comment-word'>评论</span>
            <div className='detail-comment-list' > 
                <DetailList data={this.state.detailList}/>
            </div>
        </div>
        <div className='detail-bottom-fix'>
            <input placeholder='优质评论将会被优先展示'/>
            <span onClick={this.Publishing}>发布</span>
        </div>
    </div>);
  }
}
