import HeroAndProductsFirst from "../../components/heroAndProductsFirst/HeroAndProductsFirst.jsx";
import HeroAndProductsSecond from "../../components/heroAndProductsSecond/HeroAndProductsSecond.jsx";
import React from 'react';

const HomePage = () => {
  return (
    <div>
      <HeroAndProductsFirst />
      <HeroAndProductsSecond />
    </div>
  );
};

export default HomePage;