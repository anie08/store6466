import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import {
  FiCamera,
  FiChevronLeft,
  FiChevronRight,
  FiHeadphones,
  FiMonitor,
  FiSmartphone,
  FiWatch,
} from "react-icons/fi";
import { IoGameControllerOutline } from "react-icons/io5";
import "./CategoryBrowse.scss";

const categories = [
  { name: "Phones", icon: <FiSmartphone size={32} /> },
  { name: "Smart Watches", icon: <FiWatch size={32} /> },
  { name: "Cameras", icon: <FiCamera size={32} /> },
  { name: "Headphones", icon: <FiHeadphones size={32} /> },
  { name: "Computers", icon: <FiMonitor size={32} /> },
  { name: "Gaming", icon: <IoGameControllerOutline size={32} /> },
  { name: "Phones", icon: <FiSmartphone size={32} /> },
  { name: "Smart Watches", icon: <FiWatch size={32} /> },
  { name: "Cameras", icon: <FiCamera size={32} /> },
  { name: "Headphones", icon: <FiHeadphones size={32} /> },
  { name: "Computers", icon: <FiMonitor size={32} /> },
  { name: "Gaming", icon: <IoGameControllerOutline size={32} /> },
];

const CategoryBrowse = () => {
  const [swiper, setSwiper] = useState(null);
  return (
    <div className="category-browse container">
      <div className="category-browse_header">
        <p className="category-browse_header_p">Browse By Category</p>
        <div className="category-browse_header_right-left">
          <div
            className="custom-swiper-button"
            onClick={() => swiper?.slidePrev()}
          >
            <FiChevronLeft size={32} />
          </div>
          <div
            className="custom-swiper-button"
            onClick={() => swiper?.slideNext()}
          >
            <FiChevronRight size={32} />
          </div>
        </div>
      </div>
      <div className="category-browse_elm">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={6}
          onSwiper={(swiper) => setSwiper(swiper)}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 16 },
            768: { slidesPerView: 4, spaceBetween: 20 },
            1024: { slidesPerView: 5, spaceBetween: 32 },
          }}
          className="category-browse_slider"
        >
          {categories.map((elm) => (
            <SwiperSlide key={elm.name}>
              <div className="category-browse_item">
                {elm.icon}
                <span className="category-browse_item_name">{elm.name}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CategoryBrowse;
