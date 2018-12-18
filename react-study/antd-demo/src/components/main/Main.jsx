import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './main.css'
import Carousels from './main-left/Carousels'
import Slider from './main-right/Slider'
import Containers from './main-left/Containers'
import Recommend from './main-right/Recommend'
class Main extends Component {

  render() {
    return (
      <div className="content">
        <Row>
          <Col span={18} offset={4}>
            <Row>
              <Col span={16} pull={1}>
                <Carousels />
                <Containers />
              </Col>
              <Col span={6} push={1}>
                <Slider />
                <Recommend />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Main;