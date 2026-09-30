import React from 'react';
import "./HeroAndProductsFirst.scss"
import iphone14pro from "../../../public/itemsPhotos/Iphone Image (1).png"
const HeroAndProductsFirst = () => {
  return (
    <div className="heroAndProducts  ">
      <div className="heroAndProducts_context container ">
        <div className="heroAndProducts_left-side">
          <p className="heroAndProducts_eft-side_p">Pro.Beyond.</p>
          <h1>IPhone 14 </h1>
          <p className="heroAndProducts_left-side_p2">Created to change everything for the better. For everyone</p>
<a className="heroAndProducts_eft-side_button" href="#"> Shop Now</a>
        </div>
        <div className="heroAndProducts_right-side">
          <img src={iphone14pro} />
        </div>
      </div>

    </div>
  );
};

export default HeroAndProductsFirst;