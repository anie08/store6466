import { Link, useLocation } from "react-router-dom";
import "./Breadcrumbs.scss";
const Breadcrumbs = () => {
  const { pathname } = useLocation();

  console.log(pathname.split("/").filter(Boolean));

  const paths = pathname
    .split("/")
    .filter(Boolean)
    .map((item, index, arr) => ({
      name: item,
      path: arr.slice(0, index + 1).join("/"),
    }));
  const pathsToPaint = [{ name: "home", path: "" }, ...paths];

  return (
    <div className="breadcrumbs-container container">
      <div className="breadcrumbs">
        {pathsToPaint.map((item) => (
          <div className="breadcrumbs-item" key={item.path || "home"}>
            <Link to={"/" + item.path}>{item.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumbs;
