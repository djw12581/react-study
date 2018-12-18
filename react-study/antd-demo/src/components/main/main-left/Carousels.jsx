import React, { Component } from 'react';
import { Carousel } from 'antd';
import './carousels.css'
import bg1 from '../../../static/img/bg-1.jpg'
import bg2 from '../../../static/img/bg-2.jpg'
import bg3 from '../../../static/img/bg-3.jpg'

class Carousels extends Component {
  render() {
    return (
      <div className="">
        <Carousel autoplay>
          <div>
            <img src={bg1} alt="" />
          </div>
          <div>
            <img src={bg2} alt="" />
          </div>
          <div>
            <img src={bg3} alt="" />
          </div>
        </Carousel>
      </div>
    );
  }
}

export default Carousels;