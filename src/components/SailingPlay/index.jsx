import './index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router';
import Carou from '../Public/Carou'
import {Fetcher} from '../../utils/fetch'
import {serverUrl,serverUrl1} from '../../utils/utils'
import ReactSwipes from 'react-swipes'
const {get, post} = Fetcher


export default class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           carou:null,
           list:null,
           playList:null,
           StrollList:null,
        }
    }
    componentDidMount() {
        this.props.changeTitle('航会玩');
        this.getCarou()
        this.getList()
        this.getPalyList()
        this.getStrollList()
    }
    getCarou = ()=>{
        const _this = this
            get(serverUrl+'airport-article/getArticleList',{type:'3',airportCode:'HGH'}).then(
                result => {
                    _this.setState({
                        carou:result.data
                    })
                }
            )

    }
    getList=()=>{
        const _this = this
        get(serverUrl+'airport-article/getArticleList',{type:'1',airportCode:'HGH'}).then(
                result => {
                    _this.setState({
                        list:result.data.rows
                    })
                }
            )
    }

    getPalyList=()=>{
        const _this = this
        get(serverUrl+'airport-article/getArticleList',{type:'2',airportCode:'HGH'}).then(
                result => {
                    _this.setState({
                        playList:result.data.rows
                    })
                }
            )
    }
    getStrollList=()=>{
        const _this = this
        get(serverUrl1+'airport-product/getFlashForWeChat',{airportCode:'PVG'}).then(
            result => {
                console.log(result.data.rows)
                _this.setState({
                    StrollList:result.data.rows,
                })
            }
        )
   }
    clickItem =(v,t)=>{
        hashHistory.push(`detail/${v.id}`)
    }

    intoMore =(v,t)=>{
        hashHistory.push(`productDetail/${v.id}`)
    }
  render() {
    let opt = {
        distance: 240, // 每次移动的距离，卡片的真实宽度
        currentPoint: 0,// 初始位置，默认从0即第一个元素开始
        swTouchend: (ev) => {
            let data = {
                moved: ev.moved,
                originalPoint: ev.originalPoint,
                newPoint: ev.newPoint,
                cancelled: ev.cancelled
            }
            console.log(ev);
            // this.setState({
            //     list: ev.newPoint
            // })
        }
    }
    let opt1 = {
        distance: 240, // 每次移动的距离，卡片的真实宽度
        currentPoint: 0,// 初始位置，默认从0即第一个元素开始
        swTouchend: (ev) => {
            let data = {
                moved: ev.moved,
                originalPoint: ev.originalPoint,
                newPoint: ev.newPoint,
                cancelled: ev.cancelled
            }
            console.log(ev);
            // this.setState({
            //     list: ev.newPoint
            // })
        }
    }
    let opt2 = {
        distance: 240, // 每次移动的距离，卡片的真实宽度
        currentPoint: 0,// 初始位置，默认从0即第一个元素开始
        cancelable:true
    }
    const divItem = this.state.list==null?<div></div>:this.state.list.map((v,index)=>{
        return <div className='item' onClick={this.clickItem.bind(this,v)}><img src={`${v.imgUrl}`}/><span>{v.title}</span></div>
        
    })

    const playDivItem =  this.state.playList==null?<div></div>:this.state.playList.map((v,index)=>{
        return <div className='item' onClick={this.clickItem.bind(this,v)}><img src={`${v.imgUrl}`}/><span>{v.title}</span></div>
    })

    const StrollList =  this.state.StrollList==null?<div></div>:this.state.StrollList.map((v,index)=>{
        return <div className='item' onClick={this.intoMore.bind(this,v)}><img src={`${v.imgUrl}`}/><span>{v.shopName}</span></div>
    })

    return (
      <div className="body">
        <div style={{height:400}}>
            <Carou data={this.state.carou}/>
        </div>
        <div className='viewport-title'>
            <img className='title-img' src={require('../../images/title_img1.png')}/>
            <span className='title-bottom'>报道机场最新动态，便民出行，机场先行</span>
            <span className='title-right' onClick={()=>{hashHistory.push('bigEvent')}}>查看更多<img src={require('../../images/next.png')}/></span>
        </div>
        <div className="viewport" style={{display:this.state.list==null?'none':''}}>
            <div className="flipsnap">
                <ReactSwipes className="card-slide" options={opt} >
                     {divItem}
                </ReactSwipes>
            </div>
        </div>
        <div className='viewport-title'>
            <img className='title-img' src={require('../../images/title_img2.png')}/>
            <span className='title-bottom'>小编带你嗨翻机场，玩转机场周边</span>
            <span className='title-right' onClick={()=>{hashHistory.push('specialAbilityToPlay')}}>查看更多<img src={require('../../images/next.png')}/></span>
        </div>
        <div className="viewport" style={{display:this.state.playList==null?'none':''}}>
            <div className="flipsnap">
                <ReactSwipes className="card-slide" options={opt1}>
                     {playDivItem}
                </ReactSwipes>
            </div>
        </div>
        <div className='viewport-title'>
            <img className='title-img' src={require('../../images/title_img3.png')}/>
            <span className='title-bottom'>吃喝玩乐在机场，网罗各大特色商家</span>
            <span className='title-right' onClick={()=>{hashHistory.push('strollAround')}}>查看更多<img src={require('../../images/next.png')}/></span>
        </div>
        <div className="viewport">
            <div className="flipsnap1">
                <ReactSwipes className="card-slide" options={opt2}>
                     {StrollList}
                </ReactSwipes>
            </div>
        </div>
      </div>
    );
  }
}