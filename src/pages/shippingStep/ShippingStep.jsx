import classNames from "classnames";
import { FiCalendar, FiChevronDown } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
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
  const handleSelect = (id) => {
    setSelectedId(id);
  };
  const { setCanGoNext, shipping, setShipping } = useOutletContext();
  const [selectedId, setSelectedId] = useState(shipping?.id ?? 1);

  useEffect(() => {
    setCanGoNext(true);
    setShipping(shippingData.find((item) => item.id === selectedId));
  }, [selectedId, setCanGoNext, setShipping]);

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
    </div>
  );
};

export default ShippingStep;
