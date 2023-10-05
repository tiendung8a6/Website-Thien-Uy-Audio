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
      <ScrollAnimation animateIn='wobble'
        initiallyVisible={true}>
        <h1>
          initiallyVisible
        </h1>
      </ScrollAnimation>
      <Carousel></Carousel>

      <Banner2></Banner2>
      <ScrollAnimation></ScrollAnimation>

      <section>
        <div className="container reveal">
          <h4 className="text-center p-3  mb-5 display-4 jumbotron">
            Sản Phẩm Mới Nhất
          </h4>
          <div className="text-container">
            <div className="text-box">
              <ImgShowX></ImgShowX>
            </div>

          </div>
        </div>
      </section>


      <section>
        <div className="container reveal">
          <h4 className="text-center p-3  mb-5 display-4 jumbotron">
            Sản Phẩm Mới Nhất
          </h4>
          <div className="text-container">
            <div className="text-box">
              <NewArrivals />
            </div>

          </div>
        </div>
      </section>

      <section>
        <div className="container reveal">
          <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
            Sản Phẩm Bán Chạy
          </h4>
          <div className="text-container">
            <div className="text-box">
              <BestSellers />
            </div>

          </div>
        </div>
      </section>

      <section style={{ marginTop: '-100px' }}>
        <div className="container reveal">
          <h4 className="text-center   mb-5 display-4 jumbotron">
            Danh Mục Sản Phẩm
          </h4>
          <div className="text-container">
            <div className="text-box">
              <CategoryList />
            </div>

          </div>
        </div>
      </section>
      {/* 
      <Watermark content="Ant Design">
        <div style={{ height: 500 }} />
      </Watermark> */}


      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron ">
        Danh Mục Con
      </h4>
      <SubList />

      <section>
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

      <section>
        <div className="container reveal">
          <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
            Phản hồi khách hàng
          </h4>
          <div className="text-container">
            <div className="text-box">
              <RegisterNew></RegisterNew>
            </div>

          </div>
        </div>
      </section>

      <br />
      <SpeedDial></SpeedDial>
      {/* <Footer></Footer> */}
    </>
  );
};

export default Home;
