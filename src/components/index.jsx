import 'animate.css'
import './index.less';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router';
import $ from 'jquery'
import { Button, WhiteSpace, Popover, Icon, Grid } from 'antd-mobile';
import { Fetcher } from '../utils/fetch';

const { get, post } = Fetcher;
let delFlag = 0;

const menu = [
    {
        icon:require('../images/icon_index_menu04.png'),
        name:'在线值机',
        bgColor:'#788BC5',
        link:''
    },
    {
        icon:require('../images/icon_index_menu07.png'),
        name:'地图导航',
        bgColor:'#84C478',
        link:'地图导航'
    },
    {
        icon:require('../images/icon_index_menu03.png'),
        name:'预定中心',
        bgColor:'#DFB676',
        link:'/reservationCenter'
    },
    {
        icon:require('../images/icon_index_menu08.png'),
        name:'服务大厅',
        bgColor:'#D3C378',
        link:'/publicService'
    },
    {
        icon:require('../images/icon_index_menu09.png'),
        name:'交通指南',
        bgColor:'#6FB1BF',
        link:''
    },
    {
        icon:require('../images/icon_index_menu10.png'),
        name:'航会玩',
        bgColor:'#C79688',
        link:'/sailingPlay'
    }
];

class Index extends Component {
    constructor(props){
        super(props)
        this.state = {
            visible:false,
            selected:'',
            hasAirport: 1,
        }
        this.startAnimate = this.startAnimate.bind(this);
        this.getWeather = this.getWeather.bind(this);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
    }
    componentDidMount () {
        // const { changeRoute, location, params } = this.props;
        // changeRoute(location.pathname, params && params)
        $('.index-bg').parent().parent().parent().parent().find('.am-navbar').hide()
        const { hasAirport } = this.state;
        if(hasAirport){
            $('.index-add-button').hide();
            $('.airport-line').show();
            $('.menu-list').addClass('menu-list-hasAir');
            $('.index-menu').addClass('index-menu-hasAir');
        } else {
            $('.index-add-button').css({display:'block'});
            $('.airport-line').hide();
            $('.menu-list').removeClass('menu-list-hasAir');
            $('.index-menu').removeClass('index-menu-hasAir');
        }
        document.addEventListener('click',(e)=>{
            if(delFlag && e.target !== $('.del-b.del-airline')[0] && e.target !== $('.del-b.cancle-airline')[0] && e.target !== $('.del-prop')[0]){
                $('.del-prop').animate({
                    width: 0,
                    height: 0,
                    opacity: 0
                },()=>{
                    $('.del-prop').css({ display: 'none' })
                    delFlag = 0;
                })
            }
        },false)
        this.getWeather();
        this.startAnimate();
    }

    componentWillUnmount() {
        $('.index-bg').parent().parent().parent().parent().find('.am-navbar').css({ display: 'flex' })
    }

    startAnimate () {
        const { hasAirport } = this.state;
        $('.body').css({ overflow: 'hidden' })
        const _this = this;
        let y = 0,ym = 0,diff = 0;
        document.addEventListener('touchstart',(e)=>{
            y = e.targetTouches[0].pageX;
        },false)
        document.addEventListener('touchmove',(ev)=>{
            ym = ev.targetTouches[0].pageY;
        },false)
        document.addEventListener('touchend',(ed)=>{
            $(document).off();
            diff = parseInt(ym - y);
            if(!$('.index-menu').is(':animated') && ym){
                if(diff <= -20 && !$('.menu-reverse-ani').length){
                    $('.airline-place img').hide();
                    $('.airport-button').hide();

                    $('.index-arrow').addClass('animated arrow-big-ani')
                    $('.index-weather').addClass('animated weather-ani');
                    $('.index-weather-icon').addClass('animated weather-icon');
                    $('.index-airport').addClass('animated airport-ani');
                    $('.airport-welcome').addClass('animated airport-wel-ani');
                    $('.airport-name').addClass('animated airport-name-ani');
                    $('.airport-tips').addClass('animated airport-tips-ani');
                    $('.airline-no-date').addClass('animated airline-date-ani');
                    $('.airline-start-time').addClass('animated airline-time-ani');
                    $('.airline-end-time').addClass('animated airline-time-ani');
                    $('.airline-plan').addClass('animated airline-plan-ani');
                    $('.city').addClass('animated airline-area-ani');
                    $('.airport').addClass('animated airline-airport-ani');
                    
                    if(hasAirport){
                        $('.index-add-button').hide();
                        $('.menu-list').addClass('animated menu-list-hasAir-ani');
                        $('.index-menu').addClass('animated menu-hasAir-ani');
                    }else{
                        $('.index-add-button').css({display:'block'});
                        $('.menu-list').addClass('animated menu-list-ani');
                        $('.index-menu').addClass('animated menu-ani');
                    }
                    
                    window.setTimeout(()=>{
                        $('.check-airport airport-button').hide();
                        $('.airline-no-date').hide();
                        $('.place airport').hide();
                    },1000)
                } else if (diff >= 20 && $('.arrow-big-ani').length) {
                    $('.airline-place img').show();
                    $('.airport-button').show();

                    $('.index-arrow').addClass('animated arrow-big-reverse-ani')
                    $('.index-weather').addClass('animated weather-reverse-ani');
                    $('.index-weather-icon').addClass('animated weather-reverse-icon');
                    $('.index-airport').addClass('animated airport-reverse-ani');
                    $('.airport-welcome').addClass('animated airport-wel-reverse-ani');
                    $('.airport-name').addClass('animated airport-name-reverse-ani');
                    $('.airport-tips').addClass('animated airport-tips-reverse-ani');
                    $('.airline-no-date').addClass('animated airline-date-reverse-ani');
                    $('.airline-start-time').addClass('animated airline-time-reverse-ani');
                    $('.airline-end-time').addClass('animated airline-time-reverse-ani');
                    $('.airline-plan').addClass('animated airline-plan-reverse-ani');
                    $('.city').addClass('animated airline-area-reverse-ani');
                    $('.airport').addClass('animated airline-airport-reverse-ani');

                    if(hasAirport){
                        $('.index-add-button').hide();
                        $('.menu-list').addClass('animated menu-list-hasAir-reverse-ani');
                        $('.index-menu').addClass('animated menu-hasAir-reverse-ani');
                    }else{
                        $('.index-add-button').css({display:'block'});
                        $('.menu-list').addClass('animated menu-list-reverse-ani');
                        $('.index-menu').addClass('animated menu-reverse-ani');
                    }

                    window.setTimeout(()=>{
                        $('.check-airport airport-button').show();
                        $('.airline-no-date').show();
                        $('.place airport').show();

                        $('.index-menu').removeClass('animated menu-ani menu-reverse-ani menu-hasAir-ani menu-hasAir-reverse-ani');
                        $('.index-arrow').removeClass('animated arrow-big-ani arrow-big-reverse-ani')
                        $('.index-weather').removeClass('animated weather-ani weather-reverse-ani');
                        $('.index-weather-icon').removeClass('animated weather-icon weather-reverse-icon');
                        $('.index-airport').removeClass('animated airport-ani airport-reverse-ani');
                        $('.airport-welcome').removeClass('animated airport-wel-ani airport-wel-reverse-ani');
                        $('.airport-name').removeClass('animated airport-name-ani airport-name-reverse-ani');
                        $('.airport-tips').removeClass('animated airport-tips-ani airport-tips-reverse-ani');
                        $('.airline-no-date').removeClass('animated airline-date-ani airline-date-reverse-ani');
                        $('.airline-start-time').removeClass('animated airline-time-ani airline-time-reverse-ani');
                        $('.airline-end-time').removeClass('animated airline-time-ani airline-time-reverse-ani');
                        $('.airline-plan').removeClass('animated airline-plan-ani airline-plan-reverse-ani');
                        $('.city').removeClass('animated airline-area-ani airline-area-reverse-ani');
                        $('.airport').removeClass('animated airline-airport-ani airline-airport-reverse-ani');

                        $('.menu-list').removeClass('animated menu-list-ani menu-list-reverse-ani menu-list-hasAir-ani menu-list-hasAir-reverse-ani');
                    },1000)
                }
            }
        },false)
    }

    //获取天气
    getWeather () {
        // get('https://free-api.heweather.com/v5/weather',{city:'广州',key:'5b34d257330a42e5a1ffed974b6577ff'}).then(data => {
        //     console.log(data)
        // })
        const weather = $('.index-weather');
        get('https://weixin.jirengu.com/weather').then(data => {
            weather.find('.index-weather-icon').attr({ src: `//weixin.jirengu.com/images/weather/code/${data.weather[0].now.code}.png` });
            weather.find('.index-weather-con').html(`${data.weather[0].future[0].low}/${data.weather[0].future[0].high} ℃ ${data.weather[0].future[0].text.split('/')[0]}`);
        })
    }


    handleVisibleChange = () => {
        if(!delFlag){
            $('.del-prop').css({ display: 'flex', width: 0, height: 0, opacity: 0 });
            $('.del-prop').animate({
                width: '3rem',
                height: '1.8rem',
                opacity: 1
            },()=>{
                delFlag = 1;
            })
        } else {
            $('.del-prop').animate({
                width: 0,
                height: 0,
                opacity: 0
            },()=>{
                $('.del-prop').css({ display: 'none' })
                delFlag = 0;
            })
        }
        

    };
    intoSet =()=>{
        hashHistory.push('/personalSettings')
    }
    goMenu = ({link}) => {
        if(link == '地图导航'){
            window.location.href = 'http://maps.rtmap.com/airport/?key=K7I23869HD&buildid=863200010050100001&labelstyle=circle-point&openid=oikd5jgARPHHtakvE-ZhLXe5NDHA';
            return false
        }
        hashHistory.push(link)
    }

    //航班查询
    addFlight=()=>{
        hashHistory.push(`/searchFlight`);
    }
    render() {
        return (
            <div className="body index-bg" ref='body'>
                <div className='index-animation'>
                    <span className='index-user' onClick={this.intoSet}></span>
                    <div className='index-weather'>
                        <img className='index-weather-icon' src={require('../images/index_weather.png')} />
                        <span className='index-weather-con'>{'27/35 ℃ 中雨'}</span>
                    </div>
                    <div className='index-airport'>
                        <span className='airport-welcome'>{'WELCOME TO'}</span>
                        <div className='check-airport'>
                            <span className='airport-name'>广州白云国际机场</span>
                            <Button className='airport-button' type="ghost" inline size="small" >切换</Button>
                        </div>
                        <div className='airport-tips'>小面积延误</div>
                    </div>
                    <div className='index-menu'>
                        <div className='index-arrow'>
                            <img className='animated infinite arrow-ani arrow-ani-1' src={require('../images/index-top-arr.png')} />
                            <img className='animated infinite arrow-ani arrow-ani-2' src={require('../images/index-top-arr.png')} />
                            <img className='animated infinite arrow-ani arrow-ani-3' src={require('../images/index-top-arr.png')} />
                        </div>
                        <div className='add-airport'>
                            <Button className="btn index-add-button" type="primary" onClick={this.addFlight}>添加航班</Button>
                            <div className='airport-line'>
                                <span className='alrline-delete-btn'>
                                    <Icon type='cross' size='lg' color='#666' onClick={this.handleVisibleChange} />
                                    <div className='del-prop'>
                                        <a className='del-b del-airline'>删除航班</a>
                                        <a className='del-b cancle-airline'>取消</a>
                                    </div>
                                </span>
                                <div className='airline-no-date'>
                                    <span className='airline-no'>CZ9262</span>
                                    <span className='airline-date'>{'2017-03-22'}</span>
                                </div>
                                <div className='airline-time'>
                                    <span className='airline-start-time'>{'09:00'}</span>
                                    <span className='airline-no'>CZ9262</span>
                                    <span className='airline-plan'>计划</span>
                                    <span className='airline-end-time'>{'11:25'}</span>                                   
                                </div>
                                <div className='airline-place'>
                                    <div className='place airline-start-place'>
                                        <span className='city start-city'>广州</span>
                                        <span className='airport start-airport'>白云国际机场</span>                                        
                                    </div>
                                    <img src={require('../images/new-detail-plane.png')} />
                                    <div className='place airline-end-place'>
                                        <span className='city end-city'>北京</span>
                                        <span className='airport end-airport'>首都国际机场</span>                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='menu-list'>
                    <Grid 
                        data={menu}
                        columnNum={3}
                        hasLine={false}
                        onClick={this.goMenu}
                        renderItem={(data,i) => {
                            let padding = '';
                            if (i == 2 || i == 5) {
                                padding = '.3rem .3rem 0 .15rem';
                            } else if (i == 1 || i == 4){
                                padding = '.3rem .15rem 0 .15rem';
                            } else {
                                padding = '.3rem .15rem 0 .3rem';
                            }
                            return (
                                <div style={{ padding }}>
                                    <div style={{backgroundColor:data.bgColor,padding:'.2rem'}}>
                                        <img src={data.icon} style={{ width: '.8rem', height: '.8rem' }} alt="icon" />
                                        <div style={{ fontSize: '0.28rem', marginTop: '0.24rem' }}>
                                            <span>{data.name}</span>
                                        </div>
                                    </div>
                                </div>
                        )}}
                    />
                    <div className='more-menu'>
                        <a href='javascript:;' className='menu-btn airport-search'>
                            <span onClick={this.addFlight}>航班查询</span>
                        </a>
                        <a href='javascript:;' id='customerService' className='menu-btn airport-service'>
                            <span>智能客服</span>
                            <img src={require('../images/icon_index_menu11.png')} />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Index

