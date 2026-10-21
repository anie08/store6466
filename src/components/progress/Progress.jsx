import { reviewsData } from "../../ratingData.js";
import "./Progress.scss";

const Progress = () => {
  return (
    <div className="progress">
      {reviewsData.ratingStats.map((item) => (
        <div className="progress-item" key={item.label}>
          <span className="label">{item.label}</span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${(item.count / reviewsData.totalReviews) * 100}%`,
              }}
            ></div>
          </div>
          <span className="progress-item_count">{item.count}</span>
        </div>
      ))}
    </div>
  );
};

export default Progress;
