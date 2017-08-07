import './flight.less';
import BScroll  from './js/bscroll.min.js';
import React from 'react';
import { createForm } from 'rc-form';
import moment from 'moment'; // moment.min ~= 48kb
import $ from 'jquery';
import { Picker, DatePicker, List,InputItem,Button,SearchBar,Radio  } from 'antd-mobile';
import { hashHistory } from 'react-router';
import { createStore } from 'redux'
import { connect } from 'react-redux'
import counter from '../../reducers/index'
import {cityData} from './js/city.jsx';

const RadioItem = Radio.RadioItem;
var scroll;
var cityWrapper;
var cityScroller;
var cities;
var shortcut;
var shortcutList = [];
var anchorMap = {};
var c1;
var r1;

function initCities() {
    var y = 0;
    var titleHeight = 28;
    var itemHeight = 44;
    var lists = '';
    var en = '<ul>';
    cityData.forEach(function (group) {
        var name = group.name;
        lists += '<div class="title" id="'+name+'">' + name + '</div>';
        lists += '<ul>';
        group.cities.forEach(function (g) {
            lists += '<li class="item" data-name="' + g.name + '" data-id="' + g.cityid + '">' + g.name + '</li>';
        });
        lists += '</ul>';
        var name = group.name.substr(0, 1);
        en += '<li data-anchor="' + name + '" class="item">' + name + '</li>';
        var len = group.cities.length;
        anchorMap[name] = y;
        y -= titleHeight + len * itemHeight;
    });
    en += '</ul>';
    c1 = lists;
    r1 = en;
    shortcut.style.top = (cityWrapper.clientHeight - shortcut.clientHeight) / 2 + 'px';

    scroll = new BScroll(cityWrapper, {
        probeType: 3
    });
    scroll.scrollTo(0, 0);
}

function bindEvent() {
    var touch = {};
    var firstTouch;
    shortcut.addEventListener('touchstart', function (e) {
        var anchor = e.target.getAttribute('data-anchor');
        firstTouch = e.touches[0];
        touch.y1 = firstTouch.pageY;
        touch.anchor = anchor;
        scrollTo(anchor);
    });
    shortcut.addEventListener('touchmove', function (e) {
        firstTouch = e.touches[0];
        touch.y2 = firstTouch.pageY;
        var anchorHeight = 16;
        var delta = (touch.y2 - touch.y1) / anchorHeight | 0;
        var anchor = shortcutList[shortcutList.indexOf(touch.anchor) + delta];
        scrollTo(anchor);
        e.preventDefault();
        e.stopPropagation();
    });

    function scrollTo(anchor) {
        var maxScrollY = cityWrapper.clientHeight - cityScroller.clientHeight;
        var y = Math.min(0, Math.max(maxScrollY, anchorMap[anchor]));
        if (typeof y !== 'undefined') {
            scroll.scrollTo(0, y);
        }
    }
}

class selectAirport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  componentWillMount() {

  }
  componentDidMount() {
    this.props.changeTitle('选择机场');
    this.props.changeRight('');
    $('.nav .sub-nav').on('click',function(){
        $(this).addClass("active").siblings().removeClass("active");
    })

    cityWrapper = document.querySelector('.city-wrapper-hook');
    cityScroller = document.querySelector('.scroller-hook');
    cities = document.querySelector('.cities-hook');
    shortcut = document.querySelector('.shortcut-hook');

    initCities();
    bindEvent();
  }

  createMarkup=(data)=>{
    return {__html:  data==null?'':data};
  }
  
  render() {
      const { getFieldProps } = this.props.form;
      return (
          <div className="form" id="selectAirport">
            <div className="search-bar">
                <SearchBar {...getFieldProps('searchAirport') } placeholder="城市/机场/三字码" />
            </div>
            <div className="region-list">
                <List>
                    <div className="nav">
                        <div className="left sub-nav active">中国大陆</div>
                        <div className="left sub-nav">境外地区</div>
                    </div>
                </List>
            </div>
            <div className="hot-airport">
                <List>
                    <div style={{paddingTop:'0.2rem',borderBottom:'1px solid #ddd',paddingLeft:'0.3rem'}}>
                        <span className="bar"></span>
                        <span className="bar-txt">热门机场</span>
                    </div>
                    <div className="airports">
                        <div className="item-flex">北京首都国际机场</div>
                        <div className="item-flex">广州白云国际机场</div>
                        <div className="item-flex">上海虹桥国际机场</div>
                        <div className="item-flex">上海浦东国际机场</div>
                        <div className="item-flex">厦门高崎国际机场</div>
                        <div className="item-flex">深圳宝安国际机场</div>
                    </div>
                </List>
            </div>

            <div className="airport-list">
                <div className="city">
                    <div className="city-wrapper city-wrapper-hook">
                        <div className="scroller-hook">
                            <div className="cities cities-hook" dangerouslySetInnerHTML={this.createMarkup(c1)}></div>
                        </div>
                        <div style={{display:'none'}} className="shortcut shortcut-hook" dangerouslySetInnerHTML={this.createMarkup(r1)}></div>
                    </div>
                </div>   
            </div>
            

          </div>
      );
  }
}

const SelectAirport = connect()(selectAirport);

export default createForm()(SelectAirport);
