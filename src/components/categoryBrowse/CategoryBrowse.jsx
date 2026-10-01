import {
  FiSmartphone,
  FiWatch,
  FiCamera,
  FiHeadphones,
  FiMonitor,
} from "react-icons/fi";
import { IoGameControllerOutline } from "react-icons/io5";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./CategoryBrowse.scss";

const categories = [
  { name: "Phones", icon: <FiSmartphone size={32} /> },
  { name: "Smart Watches", icon: <FiWatch size={32} /> },
  { name: "Cameras", icon: <FiCamera size={32} /> },
  { name: "Headphones", icon: <FiHeadphones size={32} /> },
  { name: "Computers", icon: <FiMonitor size={32} /> },
  { name: "Gaming", icon: <IoGameControllerOutline size={32} /> },
];

const CategoryBrowse = () => {
  return (
    <div className="category-browse container">
      <div className="category-browse_header">
        <p className="category-browse_header_p">Browse By Category</p>
        <div className="category-browse_header_right-left">
          {" "}
          <FiChevronLeft size={32} />
          <FiChevronRight size={32} />
        </div>
      </div>
      <div className="category-browse_elm">
        {categories.map((elm) => (
          <div className="category-browse_item">
            {elm.icon}
            <span className="category-browse_item_name">{elm.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBrowse;
