import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonHome from './ButtonHome/ButtonHome.jsx';
import BannerBody1 from '../ImgBanner/bannerbody.jpg'
import BannerBody2 from '../ImgBanner/bannerbody2.jpg'

import './Banner2.css'

const Banner2 = () => {
    const mobileStyles = {
        "@media (max-width: 576px)": {
            marginTop: "-150px",
        },
    };
    return (


        <Container>
            <Row xs={1} md={1} lg={2} className='mt-5 mb-5 '>
                <Col>
                    <Row  >
                        <Col>
                            <div id="carouselExampleCaptions" className="carousel slide">
                                <div className="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={1} aria-label="Slide 2" />
                                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={2} aria-label="Slide 3" />
                                </div>
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src={BannerBody1} className="d-block w-100" alt="..." />
                                        {/* <div className="carousel-caption ">
                                            <h5>Thiên Uy audio</h5>
                                            <p>Chất lượng - Giá tốt - Bền bỉ</p>
                                            <a href="https://www.facebook.com/thietkedankaraoke" > <ButtonHome>Tư vấn trực tiếp </ButtonHome></a>

                                        </div> */}
                                    </div>
                                    <div className="carousel-item">
                                        <img src={BannerBody2} className="d-block w-100" alt="..." />
                                        {/* <div className="carousel-caption ">
                                            <h5>Thiên Uy audio</h5>
                                            <p>Chất lượng đồng hành với thời gian</p>
                                            <Link to="/shop" > <ButtonHome>Mua ngay</ButtonHome></Link>

                                        </div> */}
                                    </div>
                                    <div className="carousel-item">
                                        <img src={BannerBody2} className="d-block w-100" alt="..." />
                                        <div className="carousel-caption ">
                                            {/* <h5>Thiên Uy audio</h5>
                                            <p>Giá cả tốt nhất thị trường</p>
                                            <Link hreff="/shop" > <ButtonHome>Mua ngay</ButtonHome></Link> */}
                                        </div>
                                    </div>
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true" />
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>

                        </Col>

                    </Row>
                </Col>
                <Col className=' custom-row' >
                    <Row xs={2} md={4} lg={2} style={{ marginTop: '-15px', }}>
                        {/* <Col style={{ paddingTop: '15px' }}>
                            <div id="carouselExample" className="carousel slide">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src={BannerBody2} className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="carousel-caption " style={{ backgroundcolor: 'rgba(66, 161, 165, 0.1)' }}>
                                        <Link to="#" > <ButtonHome>Mua Ngay</ButtonHome></Link>
                                    </div>
                                </div>
                            </div>

                        </Col> */}
                        <Col style={{ paddingTop: '15px' }}>
                            <Link to="/shop" ><img src={BannerBody2} className=" d-block w-100" alt="..." /> </Link>

                        </Col>

                        <Col style={{ paddingTop: '15px' }}>
                            <Link to="/shop" ><img src={BannerBody2} className=" d-block w-100" alt="..." /> </Link>

                        </Col>

                        <Col style={{ paddingTop: '15px' }}>
                            <Link to="/shop" ><img src={BannerBody1} className=" d-block w-100" alt="..." /> </Link>
                        </Col>

                        <Col style={{ paddingTop: '15px' }}>
                            <Link to="/shop" ><img src={BannerBody1} className=" d-block w-100" alt="..." /> </Link>
                        </Col>

                    </Row>
                </Col>

            </Row >
            {/* <Row md={4}>
            <Col>1 of 3</Col>
            <Col xs={6}>2 of 3</Col>
            <Col>3 of 3</Col>
        </Row> */}
        </Container >
    );
}
export default Banner2;
