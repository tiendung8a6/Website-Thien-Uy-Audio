import React, { useRef } from 'react';
import Jumbotron from "../../components/cards/Jumbotron"
import { Link } from "react-router-dom";
import Banner1 from "../ImgBanner/Banner1.png"
import Banner1Svg from "../ImgBanner/Banner1.svg"
import './carousel.css'
import Banner2 from "../ImgBanner/Banner2.png"
// import Banner3 from "../ImgBanner/Banner3.png"
// import Banner4 from "../ImgBanner/Banner4.png"


const CarouselBannerHome = () => {


    return (
        <div >
            <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel" >
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to={1} aria-label="Slide 2" />

                </div>
                <div className="carousel-inner" >
                    <div className="carousel-item active" data-bs-interval={10000}>
                        <img src={Banner1} className="d-block " alt="Banner Website" style={{ maxHeight: '650px', width: '100%' }} />
                        <div className="carousel-caption  d-md-block " >
                            <Link to="/shop" className="d-flex justify-content-center" style={{ marginTop: '-150px' }}>

                                <button class="button-64" role="button"><span class="text">Mua Ngay</span></button>


                            </Link>
                        </div>
                    </div>
                    <div className="carousel-item" data-bs-interval={2000}>
                        <img src={Banner2} className="d-block " alt="Banner Website" style={{ maxHeight: '650px' }} />
                        <div className="carousel-caption d-none d-md-block">
                            <a href='https://www.facebook.com/thietkedankaraoke' className="d-flex justify-content-center" style={{ marginTop: '-150px' }}>

                                <button class="button-64" role="button"><span class="text">Liên hệ ngay</span></button>


                            </a>
                        </div>
                    </div>

                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                </button>
            </div>



        </div>
    );
};

export default CarouselBannerHome;
