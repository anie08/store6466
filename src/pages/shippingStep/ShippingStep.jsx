import classNames from "classnames";
import { FiCalendar, FiChevronDown } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
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

// today as "YYYY-MM-DD" in the user's own timezone (for the calendar's min)
const getToday = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
};

// "2026-11-12" → "12 Nov 2026"
const formatDate = (value) =>
  new Date(`${value}T00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const ShippingStep = () => {
  const handleSelect = (id) => {
    setSelectedId(id);
  };
  const { setCanGoNext, shipping, setShipping } = useOutletContext();
  const [selectedId, setSelectedId] = useState(shipping?.id ?? 1);
  const [scheduledDate, setScheduledDate] = useState(
    shipping?.scheduledDate ?? "",
  );
  const dateInputRef = useRef(null);

  useEffect(() => {
    setCanGoNext(true);
    const chosen = shippingData.find((item) => item.id === selectedId);
    setShipping(
      chosen?.isSchedule && scheduledDate
        ? { ...chosen, date: formatDate(scheduledDate), scheduledDate }
        : chosen,
    );
  }, [selectedId, scheduledDate, setCanGoNext, setShipping]);

  const openCalendar = (e, id) => {
    e.stopPropagation(); // the card has its own onClick
    handleSelect(id); // choosing a date also selects "Schedule"
    try {
      dateInputRef.current?.showPicker(); // desktop: open the calendar
    } catch {
      // phones open it by themselves when the date input is tapped
    }
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
                <span className="date-picker">
                  <button
                    type="button"
                    className="date-picker-btn"
                    onClick={(e) => openCalendar(e, item.id)}
                  >
                    <span className="date-picker-btn__icon">
                      <FiCalendar />
                    </span>
                    <span>
                      {scheduledDate ? formatDate(scheduledDate) : item.date}
                    </span>
                    <span className="date-picker-btn__arrow">
                      <FiChevronDown />
                    </span>
                  </button>

                  <input
                    ref={dateInputRef}
                    type="date"
                    className="date-picker-btn__input"
                    min={getToday()}
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    onClick={(e) => openCalendar(e, item.id)}
                    aria-label="Delivery date"
                    tabIndex={-1}
                  />
                </span>
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
