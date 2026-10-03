import HeroAndProductsFirst from "../../components/heroAndProductsFirst/HeroAndProductsFirst.jsx";
import HeroAndProductsSecond from "../../components/heroAndProductsSecond/HeroAndProductsSecond.jsx";
import CategoryBrowse from "../../components/categoryBrowse/CategoryBrowse.jsx";
import NewArrivals from "../../components/newArrivals/NewArrivals.jsx";
import Popular from "../../components/popular/Popular.jsx";
const HomePage = () => {
  return (
    <div>
      <HeroAndProductsFirst />
      <HeroAndProductsSecond />
      <CategoryBrowse />
      <NewArrivals />
      <Popular />
    </div>
  );
};

export default HomePage;
