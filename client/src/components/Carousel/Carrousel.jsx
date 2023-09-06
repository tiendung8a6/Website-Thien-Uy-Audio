import React, { useRef } from 'react';
import { Carousel } from 'antd';
import 'antd/dist/antd.css';
import './carousel.css'

const contentStyle = {
    height: '600px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const App = () => {
    const carouselRef = useRef(null);

    const handleNextSlide = () => {
        carouselRef.current.next();
    };

    const handlePreviousSlide = () => {
        carouselRef.current.prev();
    };

    return (
        <>
            <Carousel ref={carouselRef} autoplay>
                <div>
                    <h3 style={contentStyle}>1</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>2</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>4</h3>
                </div>
            </Carousel>
            <button className="carousel-button prev" onClick={handlePreviousSlide}>
                <span class="material-symbols-outlined" style={{ fontSize: '44px', fontWeight: 700 }}>
                    arrow_back
                </span>
            </button>
            <button className="carousel-button next" onClick={handleNextSlide}>
                <span class="material-symbols-outlined" style={{ fontSize: '44px', fontWeight: 700 }}>
                    arrow_forward
                </span>
            </button>
        </>
    );
};

export default App;
