import React from 'react';
import { RefreshControl, ListView, Carousel, SwipeAction, Button } from 'antd-mobile';
import $ from 'jquery'

export default class Carou extends React.Component {
    
  state = {
    data: [],
    initialHeight: 400,
  }
  componentDidMount() {
   }
    componentWillReceiveProps(nextProps) {
        this.setState({data: nextProps.data == null ?[]:nextProps.data.rows});
    }
  render() {
    return (
      <Carousel infinite>
        {this.state.data.map(ii => (
          <a key={ii.imgUrl}
            style={{
              display: 'block', 
              height: this.state.initialHeight,
              backgroundImage: `url(${ii.imgUrl})`,
              backgroundRepeat:'no-repeat',
              backgroundSize: '100% 100%',
            }}
          />
        ))}
      </Carousel>
    );
  }
}