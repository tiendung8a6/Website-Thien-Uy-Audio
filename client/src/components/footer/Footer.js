// import { Link } from "@mui/material";

import { Link } from "react-router-dom";
import React from "react";
const Footer = () => {
    return (
        <div style={{ fontSize: '18px', fontWeight: '800', backgroundColor: '#312fc1', color: 'white' }}>
            <footer className="text-center text-lg-start  " >
                <hr />
                {/* Section: Links  */}
                <section className="text-white">
                    <div className="container text-center text-md-start mt-5 ">
                        {/* Grid row */}
                        <div className="row mt-3">
                            {/* Grid column */}
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                {/* Content */}
                                <h6 className="text-uppercase  fw-bold mb-4" style={{ color: 'yellow' }}>
                                    Thiên UY AUDIO
                                </h6>
                                <p>
                                    Thiên UY AUDIO  chuyên cung cấp các sản phẩm âm thanh, máy chiếu và loa chính hãng với giá cả cạnh tranh. Chúng tôi có đội ngũ nhân viên tư vấn nhiệt tình, sẵn sàng hỗ trợ khách hàng lựa chọn sản phẩm phù hợp với nhu cầu.
                                </p>
                            </div>
                            {/* Grid column */}
                            {/* Grid column */}
                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                {/* Links */}
                                <h6 className="text-uppercase fw-bold mb-4 " style={{ color: 'yellow' }}>
                                    Sản Phẩm
                                </h6>
                                <p>
                                    <Link href="/category/may-chieu" className="text-white">Máy chiếu</Link>
                                </p>
                                <p>
                                    <Link href="/category/thiet-bi-karaoke" className="text-reset">Thiết bị karaoke</Link>
                                </p>
                                <p>
                                    <Link href="/category/cinema" className="text-reset">Cinema</Link>
                                </p>

                            </div>
                            {/* Grid column */}
                            {/* Grid column */}
                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                {/* Links */}
                                <h6 className="text-uppercase fw-bold mb-4" style={{ color: 'yellow' }}>
                                    Liên kết hưu ích
                                </h6>
                                <p>
                                    <a href="/sendcontact" className="text-reset">Liên hệ</a>
                                </p>
                                <p>
                                    <a href="/blog" className="text-reset">Blog</a>
                                </p>
                                <p>
                                    <a href="/cart" className="text-reset">Giỏ hàng</a>
                                </p>

                            </div>
                            {/* Grid column */}
                            {/* Grid column */}
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                {/* Links */}
                                <h6 className="text-uppercase fw-bold mb-4" style={{ color: 'yellow' }}>Liên hệ</h6>
                                <p><i className="fas fa-home me-3 " /> Lô 1 Cư xá Thanh Đa</p>
                                <p>
                                    <i className="fas fa-envelope me-3 " />
                                    thienuyaudio@gmail.com
                                </p>
                                <p><i className="fas fa-phone me-3 " /> 079 2826 567 </p>

                            </div>
                            {/* Grid column */}
                        </div>
                        {/* Grid row */}
                    </div>
                </section>
                {/* Section: Links  */}


                {/* Grid container */}

                {/* Copyright */}
                <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.025)' }}>
                    © 2023 Copyright:
                    <a className="text-reset fw-bold" href="https://facebook.com/"> MOKA Team</a>
                </div>
                {/* Copyright */}
            </footer>
        </div>



    );
}

export default Footer;