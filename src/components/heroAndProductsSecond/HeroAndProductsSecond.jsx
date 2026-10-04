import React from "react";
import { Link } from "react-router-dom";
import pc from "../../../public/itemsPhotos/PlayStation.png";
import airPods from "../../../public/itemsPhotos/hero__gnfk5g59t0qe_xlarge_2x 1.png";
import appleVision from "../../../public/itemsPhotos/image 36.png";
import macAir from "../../../public/itemsPhotos/MacBook Pro 14.png";
import "./HeroAndProductsSecond.scss";

const HeroAndProductsSecond = () => {
  return (
    <div className="HeroAndProductsSecond">
      <div className="">
        <div className="products-container">
          <div className="left-column">
            <div className="playstation-card">
              <div className="playstation-image-wrapper">
                <img src={pc} alt="PlayStation 5" />
              </div>
              <div className="playstation-content">
                <h2>Playstation 5</h2>
                <p>
                  Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O
                  will redefine your PlayStation experience.
                </p>
              </div>
            </div>

            <div className="bottom-row">
              <div className="airpods-card">
                <div className="airpods-image-wrapper">
                  <img src={airPods} alt="Apple AirPods Max" />
                </div>
                <div className="airpods-content">
                  <h3>Apple AirPods Max</h3>
                  <p>Computational audio. Listen, it’s powerful</p>
                </div>
              </div>

              <div className="vision-card">
                <div className="vision-image-wrapper">
                  <img src={appleVision} alt="Apple Vision Pro" />
                </div>
                <div className="vision-content">
                  <h3>Apple Vision Pro</h3>
                  <p>An immersive way to experience entertainment</p>
                </div>
              </div>
            </div>
          </div>

          <div className="macbook-card">
            <div className="macbook-content">
              <h2>Macbook Air</h2>
              <p>
                The new 15-inch MacBook Air makes room for more of what you love
                with a spacious Liquid Retina display.
              </p>
              <Link to="/products" className="shop-btn">
                Shop Now
              </Link>
            </div>
            <div className="macbook-image-wrapper">
              <img src={macAir} alt="Macbook Air" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroAndProductsSecond;
