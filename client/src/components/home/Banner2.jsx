import React, { useState, useEffect } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Banner2.css'

const Banner2 = () => {
    const mobileStyles = {
        "@media (max-width: 576px)": {
            marginTop: "-150px",
        },
    };
    return (


        <Container>
            <Row xs={1} md={1} lg={2} className='mt-5'>
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
                                        <img src="https://demo-digitic.myshopify.com/cdn/shop/files/main-banner-2_830x550.jpg?v=1655455867;" className="d-block w-100" alt="..." />
                                        <div className="carousel-caption ">
                                            <h5>First slide label</h5>
                                            <p>Some representative placeholder content for the first slide.</p>
                                            <button type="button" class="btn btn-outline-primary" >Primary</button>

                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <img src="https://demo-digitic.myshopify.com/cdn/shop/files/main-banner-2_830x550.jpg?v=1655455867;" className="d-block w-100" alt="..." />
                                        <div className="carousel-caption ">
                                            <h5>Second slide label</h5>
                                            <p>Some representative placeholder content for the second slide.</p>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <img src="https://demo-digitic.myshopify.com/cdn/shop/files/main-banner-2_830x550.jpg?v=1655455867;" className="d-block w-100" alt="..." />
                                        <div className="carousel-caption ">
                                            <h5>Third slide label</h5>
                                            <p>Some representative placeholder content for the third slide.</p>
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
                        <Col style={{ paddingTop: '15px' }}>
                            <div id="carouselExample" className="carousel slide">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src="https://demo-digitic.myshopify.com/cdn/shop/files/main-banner-2_830x550.jpg?v=1655455867;" className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="carousel-caption " style={{ backgroundcolor: 'rgba(66, 161, 165, 0.1)' }}>
                                        <button classname="huhu">Mua ngay</button>
                                    </div>
                                </div>
                            </div>

                        </Col>

                        <Col style={{ paddingTop: '15px' }}>
                            <img src="https://demo-digitic.myshopify.com/cdn/shop/files/main-banner-2_830x550.jpg?v=1655455867;" className=" d-block w-100" alt="..." />
                        </Col>

                        <Col style={{ paddingTop: '15px' }}>
                            <img src="https://demo-digitic.myshopify.com/cdn/shop/files/main-banner-2_830x550.jpg?v=1655455867;" className=" d-block w-100 " alt="..." />
                        </Col>

                        <Col style={{ paddingTop: '15px' }}>
                            <img src="https://demo-digitic.myshopify.com/cdn/shop/files/main-banner-2_830x550.jpg?v=1655455867;" className=" d-block w-100 " alt="..." />
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
