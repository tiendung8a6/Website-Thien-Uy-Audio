import React, { useRef } from 'react';
import Jumbotron from "../../components/cards/Jumbotron"

// import Banner1 from "../ImgBanner/Banner1.png"
// import Banner2 from "../ImgBanner/Banner2.png"
// import Banner3 from "../ImgBanner/Banner3.png"
// import Banner4 from "../ImgBanner/Banner4.png"


const App = () => {


    return (
        <>
            <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to={1} aria-label="Slide 2" />
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to={2} aria-label="Slide 3" />
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval={10000}>
                        <img src='https://fit-world-theme.myshopify.com/cdn/shop/files/new-fit-world-slider-02.webp?v=1689920624' className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <div className="jumbotron text-primary h1 font-weight-bold text-center">
                                {/* <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} /> */}
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item" data-bs-interval={2000}>
                        <img src='https://fit-world-theme.myshopify.com/cdn/shop/files/new-fit-world-slider-02.webp?v=1689920624' className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">

                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://fit-world-theme.myshopify.com/cdn/shop/files/new-fit-world-slider-02.webp?v=1689920624" className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Third slide label</h5>
                            <p>Some representative placeholder content for the third slide.</p>
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



        </>
    );
};

export default App;
