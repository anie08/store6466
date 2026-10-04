import HeroAndProductsFirst from "../../components/heroAndProductsFirst/HeroAndProductsFirst.jsx";
import HeroAndProductsSecond from "../../components/heroAndProductsSecond/HeroAndProductsSecond.jsx";
import CategoryBrowse from "../../components/categoryBrowse/CategoryBrowse.jsx";
import NewArrival from "../../components/newArrival/NewArrival.jsx";
import Popular from "../../components/popular/Popular.jsx";
import SuggestedItems from "../../components/suggestedItems/SuggestedItems.jsx";
import SummerSale from "../../components/summerSale/SummerSale.jsx";

const HomePage = () => {
  return (
    <div>
      <HeroAndProductsFirst />
      <HeroAndProductsSecond />
      <CategoryBrowse />
      <NewArrival filterKey="isNewArrival" />
      <Popular />
      <SuggestedItems title="Discounts up to -50%" filterKey="isDiscounted" />
      <SummerSale />
    </div>
  );
};

export default HomePage;
