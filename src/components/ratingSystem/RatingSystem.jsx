import { reviewsData } from "../../ratingData.js";
import Progress from "../progress/Progress.jsx";
import Stars from "../../components/stars/Stars.jsx";
import "./RatingSystem.scss";
const RatingSystem = () => {
  return (
    <div className="ratingSystem">
      <div className="rating container">
        <p className="rating_p">Reviews</p>
        <div className="rating_form">
          <div className="rating_left-side">
            <h4 className="rating_left-side_h4">{reviewsData.rating}</h4>
            <p className="rating_left-side_p">
              of {reviewsData.totalReviews} reviews
            </p>
            <Stars rating={reviewsData.rating} />
          </div>
          <div className="rating_right-side">
            <Progress />
          </div>
        </div>
        <div className="rating_right-side_input">
          <input placeholder="Leave comment" />
        </div>
        <div className="rating_comments-form">
          {reviewsData.reviews.map((reviews) => (
            <div className="reviews-card" key={reviews.id}>
              <div className="reviews-card__content">
                <div className="reviews-card__content__img">
                  <img
                    src={reviews.avatar}
                    alt={reviews.name}
                    className="reviews-card__content__img__img"
                  />
                </div>
                <div className="reviews-card__content__info">
                  <p className="reviews-card__content__name">{reviews.name}</p>
                  <Stars rating={reviews.rating} />
                  <p className="reviews-card__content__rating">
                    {reviews.comment}
                  </p>
                  <div className="reviews-card__content__info__imgs">
                    {reviews.images.map((image) => (
                      <div className="reviews-card__content__info__info">
                        <img
                          className="reviews-card__content__info__imgs__imgs"
                          src={image.img}
                          alt={image.alt}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button type="button" className="details-view-more">
          viewMore
        </button>
      </div>
    </div>
  );
};

export default RatingSystem;
