import React, { Component } from 'react';
import img1 from '../../../static/img/7r.png'
import img2 from '../../../static/img/30r.png'
import img3 from '../../../static/img/yx.png'
import img4 from '../../../static/img/bq.png'
import img5 from '../../../static/img/dxt.png'

import './slider.css'
class Slider extends Component {

    render() {
        return (
            <div className="slider">
                <ul>
                    <li><a href="/"><img src={ img1 } alt="" /></a></li>
                    <li><a href="/"><img src={ img2 } alt="" /></a></li>
                    <li><a href="/"><img src={ img3 } alt="" /></a></li>
                    <li><a href="/"><img src={ img4 } alt="" /></a></li>
                    <li><a href="/"><img src={ img5 } alt="" /></a></li>
                </ul>
            </div>
        )
    }
}

export default Slider;