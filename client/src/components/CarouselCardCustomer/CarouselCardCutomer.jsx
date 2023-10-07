import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
import "./carousel_card_cus.css";
const items = [
  {
    // copy = content
    img: "https://i.pinimg.com/736x/48/0d/59/480d5961b9fe34fb1df2a6cfac81bbcd.jpg",
    name: "Nguyễn Thị Hương",
    day: "23/11/2023",
    copy: "Đã lâu tôi mới tìm thấy một bộ Karaoke như vậy. Âm thanh 7.2 thực sự làm tăng phần sống động cho những bài hát. Chất lượng âm thanh vòm từ 7 loa là không thể tin được. Cảm ơn bạn vì sản phẩm tuyệt vời này!.",

  },
  {

    img: "https://i.pinimg.com/564x/98/e0/4b/98e04bebba74ba1ac2c0ca14979d5c8d.jpg",
    name: "Trần Văn Nam",
    day: "13/11/2023",
    copy: "Karaoke gia đình của bạn là lựa chọn hoàn hảo. Micro chất lượng cao giúp giảm thiểu tiếng ồn, loa tái tạo âm thanh tốt nhất. Điều này thực sự làm nổi bật những buổi hát Karaoke tại nhà. Tôi rất hạnh phúc với sản phẩm này.",
  },
  {

    img: "https://i.pinimg.com/564x/73/bc/d0/73bcd06b3727bb0be68ee4b29ce2cca5.jpg",
    name: "Phạm Thị Lan Anh",
    day: "22/11/2023",

    copy: "Bộ dàn Karaoke đã làm thay đổi hoàn toàn không khí trong gia đình. Âm thanh chất lượng, đặc biệt là loa siêu trầm, giúp tôi và bạn bè thưởng thức những bản Karaoke yêu thích một cách hoàn hảo. Sản phẩm đáng đồng tiền!",
  },
  {

    img: "https://i.pinimg.com/564x/71/b1/ee/71b1ee1b52860350aa2e785f2d6ac79b.jpg",
    name: "Lê Đình Quân",
    day: "22/01/2023",

    copy: "Sự lựa chọn tuyệt vời cho không gian giải trí gia đình. Âm thanh 7.2 thật sự làm tăng cường trải nghiệm của chúng tôi. Chất lượng âm thanh đỉnh cao và khả năng tái tạo âm từ nhiều hướng là điểm mạnh nổi bật. Rất đáng đầu tư!",
  },
  {

    img: "https://i.pinimg.com/564x/09/c6/27/09c62710757c72b37da2b53c9004b156.jpg",
    name: "Ngọc Thanh Hằng",
    day: "18/01/2023",

    copy: "Bộ dàn Karaoke gia đình của bạn không chỉ là sản phẩm, mà là một trải nghiệm âm nhạc đích thực. Micro chất lượng, loa sống động, và thiết kế sang trọng. Mọi buổi hát Karaoke đều trở nên tuyệt vời hơn. Cảm ơn bạn!",
  },
  {
    img: "https://i.pinimg.com/564x/a9/37/44/a9374473e6019890be1f824f3f460ca3.jpg",
    name: "Trần Minh Tuấn",
    day: "30/1/2023",
    copy: "Bộ dàn Karaoke gia đình của bạn làm cho không gian giải trí của chúng tôi trở nên thú vị hơn bao giờ hết. Amply mạnh mẽ, loa chất lượng, và chất âm sống động. Tôi rất hài lòng với sự đầu tư này",
  },
];

const Card = (props) => {
  return (
    <>

      <li className="card-ccc">
        {/* <span className="material-icons">{props.icon}</span> */}
        <img src={props.img} alt="" srcset="" className=" rounded-circle mx-auto" style={{ height: '100px' }} />
        <h3 className="my-2">{props.name}</h3>
        <span className="text-gray-400">{props.day}</span>
        <p>{props.copy}</p>
      </li>
    </>
  );
};

const CarouselCardCustomer = () => {
  const [moveClass, setMoveClass] = useState("");
  const [carouselItems, setCarouselItems] = useState(items);

  useEffect(() => {
    document.documentElement.style.setProperty("--num", carouselItems.length);
  }, [carouselItems]);

  const handleAnimationEnd = () => {
    if (moveClass === "prev") {
      shiftNext([...carouselItems]);
    } else if (moveClass === "next") {
      shiftPrev([...carouselItems]);
    }
    setMoveClass("");
  };

  const shiftPrev = (copy) => {
    let lastcard = copy.pop();
    copy.splice(0, 0, lastcard);
    setCarouselItems(copy);
  };

  const shiftNext = (copy) => {
    let firstcard = copy.shift();
    copy.splice(copy.length, 0, firstcard);
    setCarouselItems(copy);
  };

  return (
    <div>
      {/* <h1 className='uppercase text-[35px] font-semibold text-[#1a3760] text-center mt-10 font-serif '> Customer's feedback</h1> */}
      <div className="carouselwrapper module-wrapper">
        <div className="ui">
          <button onClick={() => setMoveClass("next")} className="prev">
            <span className="material-icons">chevron_left</span>
          </button>
          <button onClick={() => setMoveClass("prev")} className="next">
            <span className="material-icons">chevron_right</span>
          </button>
        </div>
        <ul
          onAnimationEnd={handleAnimationEnd}
          className={`${moveClass} CarouselCardCustomer`}
        >
          {carouselItems.map((t, index) => (
            <Card key={t.copy + index} img={t.img} name={t.name} day={t.day} copy={t.copy} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CarouselCardCustomer