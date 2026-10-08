import { initialProducts } from "../../data.js";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "swiper/css";
import "swiper/css/navigation";
import "./Popular.scss";

const Popular = () => {
  return (
    <section className="popular">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={0}

        breakpoints={{
          300: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        {initialProducts
          .filter((elm) => elm.isPopular)
          .reverse()
          .map((elm, index) => (
            <SwiperSlide key={elm.id}>
              <div className={`popular_card popular_card--${index + 1}`}>
                <div className="popular_img-box">
                  <img className="popular_img" src={elm.image} alt={elm.name} />
                </div>

                <div className="popular_info">
                  <h3 className="popular_title">{elm.name}</h3>

                  <p className="popular_desc">{elm.description}</p>

                  <Link to={`/products`} className="popular_btn">
                    Shop Now
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default Popular;
