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
import AdProduct from "../components/adProduct/AdProduct";

// import ScrollAnimation from 'react-animate-on-scroll';
// import "animate.css/animate.min.css";

const Home = () => {
  return (
    <>
      {/* <ScrollAnimation animateIn='wobble'
        initiallyVisible={true}>
        <h1>
          initiallyVisible
        </h1>
      </ScrollAnimation> */}
      <Carousel></Carousel>
      {/* <div className="jumbotron text-danger h1 font-weight-bold text-center">
        <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
      </div> */}

      <Banner2></Banner2>
      <h4 className="text-center p-3  mb-5 display-4 jumbotron animate__animated animate__bounce">
        Sản Phẩm Mới Nhất
      </h4>

      <NewArrivals />

      {/* <ScrollAnimation animateIn='flipInY'
        animateOut='flipOutY'>
        <h4 className="text-center p-3 mt-5 mb-5 display-4 ">
          Sản Phẩm Bán Chạy
        </h4>
      </ScrollAnimation> */}

      <AdProduct />
      <BestSellers />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Danh Mục Sản Phẩm
      </h4>
      {/* 
      <Watermark content="Ant Design">
        <div style={{ height: 500 }} />
      </Watermark> */}
      <CategoryList />

      {/* <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron ">
        Danh Mục Con
      </h4>
      <SubList /> */}
      <CarouselCardCustomer></CarouselCardCustomer>

      <RegisterNew></RegisterNew>
      <br />
      <SpeedDial></SpeedDial>
      {/* <Footer></Footer> */}
    </>
  );
};

export default Home;
