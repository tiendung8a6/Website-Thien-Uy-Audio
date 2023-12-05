import React from "react";
import './scrollanimation.css'
const ScrollAnimation = () => {

    return (
        <div>
            <section className="hero">
                <div className="hero-inner" id="section-0">
                    <figure />
                    <h2 className="hero__title">Explore our world</h2>
                </div>
                <div className="hero-inner" id="section-1">
                    <figure />
                    <h2 className="hero__title">View all its beauty</h2>
                </div>
                <div className="hero-inner" id="section-2">
                    <figure />
                    <h2 className="hero__title">Take lots of photos</h2>
                </div>
                <div className="hero-inner" id="section-3">
                    <figure />
                    <h2 className="hero__title">Chào mừng bạn đến với <br></br> Thiên UY AUDIO</h2>


                </div>
            </section>
            {/* <section className="content" style={{ background: '#f8bbd0' }}>
                <article className="content__inner">
                    <h1 className="content__title">Giới Thiệu về sản phẩm chúng tôi</h1>
                    <h3 className="content__author">Thienuyaudio.com</h3>

                    <blockquote cite="Bob Ross">Thế nào là âm thanh 5.1</blockquote>
                    <h5>Âm thanh 5.1 là hệ thống âm thanh đa kênh gồm 5 loa và 1 loa siêu trầm. Hệ thống này bao gồm:</h5>
                    <ul>
                        <li>2 loa trước: tái tạo âm thanh chính của phim hoặc nhạc</li>
                        <li>2 loa sau: tái tạo âm thanh xung quanh và âm thanh hiệu ứng</li>
                        <li>1 loa trung tâm: tái tạo âm thanh thoại và âm thanh chính của phim</li>
                        <li>1 loa siêu trầm: tái tạo âm trầm</li>
                    </ul>
                    <h5>Các định dạng âm thanh 5.1</h5>
                    <h5> Có nhiều định dạng âm thanh 5.1 khác nhau, bao gồm: </h5>


                    <ul>
                        <li>Dolby Digital 5.1: Đây là định dạng âm thanh 5.1 phổ biến nhất</li>
                        <li>DTS 5.1: Đây là định dạng âm thanh 5.1 chất lượng cao hơn Dolby Digital 5.1.</li>
                        <li>THX Surround EX: Đây là định dạng âm thanh 5.1 được phát triển bởi THX.</li>
                    </ul>

                    <h5>Chất lượng âm thanh 5.1 phụ thuộc vào nhiều yếu tố, bao gồm: </h5>
                    <ul>
                        <li>Chất lượng loa: Loa là thiết bị quan trọng nhất trong hệ thống âm thanh 5.1. Loa chất lượng tốt sẽ mang lại âm thanh rõ ràng, chi tiết và sống động.</li>

                        <li>Chất lượng amply: Amply có nhiệm vụ khuếch đại âm thanh từ loa. Amply chất lượng tốt sẽ giúp âm thanh được khuếch đại mạnh mẽ và rõ ràng.</li>

                        <li>Chất lượng nguồn phát: Nguồn phát âm thanh cũng ảnh hưởng đến chất lượng âm thanh 5.1. Nguồn phát âm thanh chất lượng tốt sẽ mang lại âm thanh rõ ràng và chính xác.</li>

                        <li>Sắp xếp loa: Sắp xếp loa đúng cách sẽ giúp âm thanh được lan tỏa tốt hơn và tạo ra hiệu ứng âm thanh vòm tốt hơn.</li>
                    </ul>


                    <blockquote cite="Bob Ross">Thế nào là âm thanh 7.2</blockquote>
                    <h5>Âm thanh 7.2 là hệ thống âm thanh đa kênh gồm 7 loa và 2 loa siêu trầm. Hệ thống này bao gồm:</h5>
                    <ul>
                        <li>2 loa trước: tái tạo âm thanh chính của phim hoặc nhạc</li>
                        <li>2 loa sau: tái tạo âm thanh xung quanh và âm thanh hiệu ứng</li>
                        <li>2 loa vòm: tái tạo âm thanh từ trên cao</li>
                        <li>2 loa siêu trầm: tái tạo âm trầm</li>


                    </ul>
                    <h5>Các yếu tố ảnh hưởng đến chất lượng âm thanh 7.2</h5>
                    <ul>
                        <li>Chất lượng âm thanh 7.2 phụ thuộc vào nhiều yếu tố tương tự như âm thanh 5.1. Ngoài ra, chất lượng loa vòm cũng ảnh hưởng đến chất lượng âm thanh 7.2. Loa vòm chất lượng tốt sẽ giúp âm thanh từ trên cao được rõ ràng và chi tiết hơn.</li>
                    </ul>

                    <blockquote cite="Bob Ross">Bộ dàn Karaoke bao gồm những gì</blockquote>
                    <h5>Bộ dàn Karaoke bao gồm các thiết bị sau</h5>
                    <ul>
                        <li>Loa Karaoke là thiết bị quan trọng nhất trong bộ dàn Karaoke. Loa Karaoke có nhiệm vụ tái tạo âm thanh ra ngoài để người nghe có thể thưởng thức.</li>
                        <li>Amply Karaoke là thiết bị khuếch đại âm thanh. Amply Karaoke có nhiệm vụ khuếch đại âm thanh từ micro và loa Karaoke</li>
                        <li>Micro Karaoke là thiết bị thu âm thanh từ người hát. Micro Karaoke có nhiệm vụ truyền tải âm thanh từ người hát đến amply Karaoke.</li>
                        <li>Máy tính hoặc đầu phát Karaoke là thiết bị phát nhạc Karaoke. Máy tính hoặc đầu phát Karaoke có nhiệm vụ cung cấp nguồn nhạc cho bộ dàn Karaoke.</li>
                        <li>Ngoài các thiết bị chính trên, bộ dàn Karaoke còn có một số phụ kiện đi kèm như dây kết nối, giá đỡ</li>
                    </ul>

                    <blockquote cite="Bob Ross">Karaoke gia đình có hay hơn ngoại quán không?</blockquote>
                    <h5>Karaoke gia đình có thể hay hơn ngoại quán nếu bạn biết cách lựa chọn và lắp đặt bộ dàn Karaoke phù hợp. Một bộ dàn Karaoke gia đình hay cần đáp ứng các tiêu chí sau</h5>
                    <ul>
                        <li>Loa Karaoke là thiết bị quan trọng nhất trong bộ dàn Karaoke. Loa Karaoke chất lượng tốt sẽ mang lại âm thanh hay và sống động.</li>
                        <li>Amply Karaoke cần phù hợp với loa Karaoke để đảm bảo âm thanh được khuếch đại tốt nhất</li>
                        <li>Micro Karaoke chuyên dụng sẽ giúp bạn hát hay hơn và hạn chế tạp âm.</li>
                        <li>Không gian phòng Karaoke rộng rãi sẽ giúp âm thanh được lan tỏa tốt hơn.</li>
                    </ul>







                </article>
            </section> */}
        </div>


    );
}

export default ScrollAnimation;