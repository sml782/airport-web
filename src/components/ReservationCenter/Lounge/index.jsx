import './index.less'
import React from 'react';
import $ from 'jquery';
import {
  SearchBar, Tabs, Steps,List,ActionSheet,Toast, Icon
} from 'antd-mobile';
import {Fetcher} from '../../../utils/fetch'
import {serverUrl,serverUrl1,imgUrl} from '../../../utils/utils'
import LoungeList from '../../Public/LoungeList'

const {get, post} = Fetcher
const TabPane = Tabs.TabPane;
const Item = List.Item;
const Brief = Item.Brief;
const iconList = [
];


export default class MyBalanceDemo extends React.Component {
  constructor(props) {
        super(props)
        this.state = {
           list:null,
           float:false,
           clicked1:null,
           postion:'none',
           terminalName:'',
           terminalType:'',
           securityBeforeOrAfter:'',
           boarding:'none',
           mask:'none'
        }
    }
  componentDidMount() {
    const _this = this;
    this.props.changeTitle('休息室');
    this.getList()
    this.setState({
      float:!_this.state.float
    })
  }
  showShareActionSheet = () => {
    const icons = [...iconList];
    icons.length = 6;
    ActionSheet.showShareActionSheetWithOptions({
      options: icons,
      // title: '标题',
      message: '类别',
      className: 'my-action-sheet',
    },
    (buttonIndex) => {
      this.setState({ clicked1: buttonIndex > -1 ? icons[buttonIndex].title : 'cancel' });
      const _this = this 
      // also support Promise
      return new Promise((resolve) => {
        //console.log(buttonIndex)
          //Toast.info(`您选择了${icons[buttonIndex].title}!`);
          let data = {
            shopType:buttonIndex+1
          }
          setTimeout(resolve, 1000);
      });
    });
  }
  getAnyList=(data)=>{
    const _this = this
    data.airportCode='PVG'
    get(serverUrl1+'airport-product/getFlashForWeChat',data).then(
        result => {
            _this.setState({
                list:result.data.rows,
            })
        }
    )
  }
  getList=()=>{
    const _this = this
    get(serverUrl1+'airport-product/getLoungeListForWeChat',{airportCode:'HGH'}).then(
        result => {
            console.log(result)
            _this.setState({
                list:result.data.rows,
                float:!_this.state.float
            })
        }
    )
  }
  showShareActionSheetMulpitleLine = () => {
    const _this = this
    this.setState({
      postion:'block',
      mask:'block'
    })
    $('.button-chose').unbind("click")
     $('.button-chose').click(
       function(){
         const html = $(this).parent()[0].firstChild.innerHTML
         console.log($(this)[0].className)
         if($(this)[0].className == 'button-chose'){
            $(this).addClass("product-add")
            const btnHtml = $(this).html()
            if(html == '航站楼'){
                _this.setState({
                  terminalName:btnHtml
                })
            }else if(html == '出发类型'){
                if(_this.state.terminalType==''){
                  _this.setState({
                    terminalType:btnHtml
                  })
                }else{
                  const btn = _this.state.terminalType +','+btnHtml
                  _this.setState({
                    terminalType:btn
                  })
                }
            }else{
              if(_this.state.securityBeforeOrAfter==''){
                  _this.setState({
                    securityBeforeOrAfter:btnHtml
                  })
                }else{
                  const btn = _this.state.securityBeforeOrAfter +','+btnHtml
                  _this.setState({
                    securityBeforeOrAfter:btn
                  })
                }
            }

         }else{
            $(this).removeClass("product-add")
            const btnHtml = $(this).html()
            if(html == '航站楼'){
                _this.setState({
                  terminalName:''
                })
            }else if(html == '出发类型'){
                const arr = _this.state.terminalType.split(',')
                let btnVal = ''
                arr.map((v,index)=>{
                  if(index == 0){
                    if(v != btnHtml){
                      btnVal = v
                    }
                  }else{
                    if(v != btnHtml){
                      btnVal = btnVal+','+v
                    }
                  }
                })
                _this.setState({
                  terminalType:btnVal
                })
                //console.log(btnVal)
            }else{
              if(_this.state.securityBeforeOrAfter==''){
                  
                }
            }
         }
       }
     )
  }
  cancel = () =>{
    this.setState({
      postion:'none',
      mask:'none'
    })
  }
  clickOK = () =>{
    this.setState({
      postion:'none',
      mask:'none'
    })
  }
  Reseat = () =>{
    $('.button-chose').removeClass("product-add")
    this.setState({
           terminalName:'',
           terminalType:'',
           securityBeforeOrAfter:'',
    })
  }
  
  showBoarding =()=>{
    this.setState({
      boarding:'block',
      mask:'block'
    })
  }
  cancelBoarding = () =>{
    $('.boarding-input').val('')
    this.setState({
      boarding:'none',
      mask:'none'
    })
  }
  clickOKBoarding = () =>{
    let data = {
      boardGate:$('.boarding-input').val()
    }
    $('.boarding-input').val('')
    this.getAnyList(data)
    this.setState({
      boarding:'none',
      mask:'none'
    })
  }
  ReseatBoarding = () =>{
    $('.boarding-input').val('')
  }
  clickMask =()=>{
    this.setState({
      boarding:'none',
      mask:'none',
      postion:'none',
    })
  }
  
  render() {
    const listItem = this.state.list==null?'':this.state.list.map((v,index)=>{
        return <LoungeList data={v} key={index}></LoungeList>
    })
    
    return (<div  style={{ marginBottom: 30,width:'100%' }}>
        <div className='StrollAround-img'></div>
        <div className='StrollAround-buy'>
            <span onClick={this.showShareActionSheet}>类别<img className='buy-img' src={require('../../../images/top-stroll.png')} /></span>
            <span onClick={this.showShareActionSheetMulpitleLine} >位置<img className='buy-img' src={require('../../../images/top-stroll.png')} /></span>
            <span onClick={this.showBoarding}>登机口<img className='buy-img' src={require('../../../images/top-stroll.png')} /></span>
        </div>
        <div>
          {listItem}
        </div>
        <div className='StrollAround-mask' onClick={this.clickMask} style={{display:`${this.state.mask}`}}> 

        </div>
        <div className='product-postion' style={{display:`${this.state.postion}`}}>
              <div className='postion-top'>
                    <span className='postion-top-c' onClick={this.cancel}>取消</span>
                    <span className='postion-top-r' onClick={this.Reseat}>重置</span>
                    <span className='postion-top-s' onClick={this.clickOK}>确定</span>
              </div>
              <div className='product-Terminal'>
                  <span className='first-word'>航站楼</span>
                  <span className='button-chose' style={{marginLeft:80}}>主航站楼</span>
              </div>
              <div className='product-Departure'>
                  <span className='first-word'>出发类型</span> 
                  <span className='button-chose' style={{marginLeft:80}}>国内出发</span>
                  <span className='button-chose'>国内到达</span>
                  <span className='button-chose'>国际出发</span>
              </div>
              <div className='product-Security'>
                  <span className='first-word'>安检前后</span>
                  <span className='button-chose' style={{marginLeft:80}}>到达层</span>
                  <span className='button-chose'>到达区</span>
                  <span className='button-chose'>安检前</span>
                  <span className='button-chose'>安检后</span>
              </div>
        </div>
        <div className='product-postion' style = {{display:`${this.state.boarding}`}}>
            <div className='postion-top'>
                  <span className='postion-top-c' onClick={this.cancelBoarding}>取消</span>
                  <span className='postion-top-r' onClick={this.ReseatBoarding}>重置</span>
                  <span className='postion-top-s' onClick={this.clickOKBoarding}>确定</span>
            </div>
             <span className='bording-word'>输入登机口</span>
            <div className='bording-btn'> 
              <input className='boarding-input'/><img src={require('../../../images/search_green.png')}/>
            </div>
        </div>
    </div>);
  }
}
