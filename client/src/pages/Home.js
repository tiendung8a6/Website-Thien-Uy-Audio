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
const Home = () => {
  return (
    <>
      <Carousel></Carousel>
      {/* <div className="jumbotron text-danger h1 font-weight-bold text-center">
        <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
      </div> */}

      <Banner2></Banner2>
      <h6 className="text-center p-3 mt-5 text-primary  "> Những sản phẩm nỗi bật nhất trong bộ sưu tập</h6>
      <h4 className="text-center p-3  mb-5 display-4 jumbotron">
        Sản Phẩm Mới Nhất
      </h4>

      <NewArrivals />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Sản Phẩm Bán Chạy
      </h4>
      <BestSellers />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Danh Mục Sản Phẩm
      </h4>
      {/* 
      <Watermark content="Ant Design">
        <div style={{ height: 500 }} />
      </Watermark> */}
      <CategoryList />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Danh Mục Con
      </h4>
      <SubList />
      <CarouselCardCustomer></CarouselCardCustomer>

      <RegisterNew></RegisterNew>
      <br />
      {/* <Footer></Footer> */}
    </>
  );
};

export default Home;
