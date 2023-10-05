import React, { useEffect } from "react";
import './imgshowx.css'
const ImgShowX = () => {
    return (
        <>

            <div className="swiper-container">
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                        <div className="container-general">
                            <div className="gallery-wrap wrap-effect-1">
                                <div className="item" />
                                <div className="item" />
                                <div className="item" />
                                <div className="item" />
                                <div className="item" />
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="container-general">
                            <div className="gallery-wrap wrap-effect-2">
                                <div className="item" />
                                <div className="item" />
                                <div className="item" />
                                <div className="item" />
                                <div className="item" />
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="container-general">
                            <div className="gallery-wrap wrap-effect-3">
                                <div className="item" />
                                <div className="item" />
                                <div className="item" />
                                <div className="item" />
                                <div className="item" />
                            </div>
                        </div>
                    </div>
                    <div className="swiper-slide">
                        <div className="container-general wrap-effect-4">
                            <div className="gallery-wrap">
                                <div className="item" />
                                <div className="item" />
                                <div className="item" />
                                <div className="item" />
                                <div className="item" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    );
}

export default ImgShowX;