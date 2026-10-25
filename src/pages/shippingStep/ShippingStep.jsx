import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { FiCalendar, FiChevronDown } from "react-icons/fi";
import "./ShippingStep.scss";

const shippingData = [
  {
    id: 1,
    title: "Free",
    description: "Regulary shipment",
    date: "17 Oct, 2023",
  },
  {
    id: 2,
    title: "$8.50",
    description: "Get your delivery as soon as possible",
    date: "1 Oct, 2023",
  },
  {
    id: 3,
    title: "Schedule",
    description: "Pick a date when you want to get your delivery",
    date: "Select Date",
    isSchedule: true,
  },
];

const ShippingStep = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(1);

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  return (
    <div className="shipping-step">
      <h2 className="checkout-layout__title">Shipment Method</h2>

      <div className="shipping-list">
        {shippingData.map((item) => (
          <div
            key={item.id}
            className={classNames("shipping-card", {
              "shipping-card--selected": selectedId === item.id,
            })}
            onClick={() => handleSelect(item.id)}
          >
            <div className="shipping-card__radio-wrapper">
              <input
                type="radio"
                name="shipping-selection"
                checked={selectedId === item.id}
                onChange={() => handleSelect(item.id)}
                className="shipping-card__radio"
              />
            </div>

            <div className="shipping-card__body">
              <span className="shipping-card__title">{item.title}</span>
              <span className="shipping-card__desc">{item.description}</span>
            </div>

            <div className="shipping-card__date">
              {item.isSchedule ? (
                <button type="button" className="date-picker-btn">
                  <span className="date-picker-btn__icon">
                    <FiCalendar />
                  </span>
                  <span>{item.date}</span>
                  <span className="date-picker-btn__arrow">
                    <FiChevronDown />
                  </span>
                </button>
              ) : (
                <span>{item.date}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="checkout-layout__actions">
        <button
          type="button"
          className="checkout-btn checkout-btn--outline"
          onClick={() => navigate("/checkout/address")}
        >
          Back
        </button>
        <button
          type="button"
          className="checkout-btn checkout-btn--primary"
          disabled={!selectedId}
          onClick={() => navigate("/checkout/payment")}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ShippingStep;
