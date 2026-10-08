import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const { pathname } = useLocation();

  console.log(pathname.split("/").filter(Boolean));

  const paths = pathname
    .split("/")
    .filter(Boolean)
    .map((item) => ({
      name: item,
      path: item,
    }));

  const pathsToPaint = [{ name: "home", path: "" }, ...paths];

  return (
    <div
      style={{
        display: "flex",
        color: "black",
      }}
    >
      {pathsToPaint.map((item) => (
        <div>
          <Link to={"/" + item.path}>{item.name}/</Link>
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
