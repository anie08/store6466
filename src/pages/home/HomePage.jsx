import HeroAndProductsFirst from "../../components/heroAndProductsFirst/HeroAndProductsFirst.jsx";
import HeroAndProductsSecond from "../../components/heroAndProductsSecond/HeroAndProductsSecond.jsx";
import CategoryBrowse from "../../components/categoryBrowse/CategoryBrowse.jsx";
import NewArrivals from "../../components/newArrivals/NewArrivals.jsx";
const HomePage = () => {
  return (
    <div>
      <HeroAndProductsFirst />
      <HeroAndProductsSecond />
      <CategoryBrowse />
      <NewArrivals />
    </div>
  );
};

export default HomePage;
