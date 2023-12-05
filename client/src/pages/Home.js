import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";

import Carousel from "../components/Carousel/Carrousel"
import CarouselCardCustomer from "../components/CarouselCardCustomer/CarouselCardCutomer";
import RegisterNew from '../pages/auth/RegisterNew/RegisterNew'
import Banner2 from "../components/home/Banner2";
import Footer from "../components/footer/Footer";
import SpeedDial from "../components/SpeedDial/SpeedDial";
import ScrollAnimation from "../components/ScrollAnimatiion/ScrollAnimation";
import ImgShowX from "../components/ImgShowX/ImgShow"
import BlogHome from "../components/home/BlogHome";
import { Link } from 'react-router-dom'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import './Home.css'
const Home = () => {
  function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }

  window.addEventListener("scroll", reveal);
  return (
    <>

      <Carousel></Carousel>

      <Banner2></Banner2>

      <section className="section-homepage" >
        <div className="container reveal">
          <h4 className="text-center  display-4 jumbotron">
            Sản Phẩm Mới Nhất
          </h4>
          <h4 className="text-center  "><Link to="/shop"><KeyboardDoubleArrowRightIcon />Tất cả sản phẩm</Link> </h4>
          <div className="text-container">
            <div className="text-box " >
              <NewArrivals />
            </div>

          </div>
        </div>
      </section>

      <section className="section-homepage" style={{ marginTop: '20px' }}>
        <div className="container reveal">

          <div className="text-container">
            <div className="text-box">
              <ImgShowX></ImgShowX>
            </div>

          </div>
        </div>
      </section>

      <ScrollAnimation></ScrollAnimation>



      <section className="section-homepage" >
        <div className="container reveal">
          <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
            Sản Phẩm Bán Chạy
          </h4>
          <h4 className="text-center  "><Link to="/shop"><KeyboardDoubleArrowRightIcon />Tất cả sản phẩm</Link> </h4>
          <div className="text-container" style={{ marginTop: '-20px' }}>
            <div className="text-box">
              <BestSellers />
            </div>

          </div>
        </div>
      </section>

      <section className="section-homepage" style={{ marginTop: '5px', background: 'white', padding: '20px 0' }}>
        <div className="container reveal">
          <h1 className="text-center   mb-5 display-4 jumbotron">
            Blog đang chú ý
          </h1>
          <h4 className="text-center mb-5 "><Link to="/blog"><KeyboardDoubleArrowRightIcon />Tất cả bài Blog</Link> </h4>
          <div className="text-container">
            <div className="text-box">
              <BlogHome />
            </div>

          </div>
        </div>
      </section>

      <section className="section-homepage" style={{ marginTop: '50px' }}>
        <div className="container reveal">
          <h4 className="text-center mb-5 display-4 jumbotron">
            Danh Mục Sản Phẩm
          </h4>
          <div className="text-container">
            <div className="text-box">
              <CategoryList />
            </div>

          </div>
        </div>
      </section>


      {/* <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron ">
        Danh Mục Con
      </h4>
      <SubList /> */}

      <section className="section-homepage">
        <div className="container reveal">
          <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
            Phản hồi khách hàng
          </h4>
          <div className="text-container">
            <div className="text-box">
              <CarouselCardCustomer></CarouselCardCustomer>
            </div>

          </div>
        </div>
      </section>

      {/* <section  className="section-homepage" style={{ background: '#18164c' }} >
        <div className="container reveal" >
          <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron " style={{ color: 'white' }}>
            Đối tác chiến lược
          </h4>
          <div className="text-container">
            <div className="text-box">
              <RegisterNew></RegisterNew>
            </div>

          </div>
        </div>
      </section> */}

      <br />
      {/* <SpeedDial></SpeedDial> */}
      <Footer></Footer>
    </>
  );
};

export default Home;
