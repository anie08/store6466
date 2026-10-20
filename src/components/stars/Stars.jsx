import starYellow from "../../../public/itemsPhotos/Star 3.svg";
import starGrey from "../../../public/itemsPhotos/Star 5.svg";
import "./Stars.scss";
const Stars = ({ rating }) => {
  const total = [1, 2, 3, 4, 5];

  return (
    <div className="stars ">
      <div className="stars_content  ">
        <div className="stars-container">
          {total.map((item, index) => {
            let width = 0;
            if (item < rating) {
              width = 100;
            } else if (item - rating < 1) {
              width = 100 - (item - rating) * 100;
            }

            return (
              <div className="star">
                <img className="star_gray-star" src={starGrey} alt="star" />
                <img
                  className="star_yellow-star"
                  src={starYellow}
                  style={{ width: width + "%" }}
                  alt="star"
                  key={index}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stars;
