import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { FiX, FiPlus, FiEdit2 } from "react-icons/fi";
import "./AddAdress.scss";

const addresesData = [
  {
    id: 1,
    title: "2118 Thornridge",
    tag: "HOME",
    address: "2118 Thorrnridge",
    phone: "(209) 555-0104",
  },
  {
    id: 2,
    title: "Headoffice",
    tag: "OFFICE",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    phone: "(704) 099-6466",
  },
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [selectedAddressId, setSelectedAddressId] = useState(1);
  const [addresses, setAddresses] = useState(addresesData);

  const handleSelect = (id) => {
    setSelectedAddressId(id);
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    setAddresses(addresses.filter((address) => address.id !== id));
    if (selectedAddressId === id) {
      setSelectedAddressId(null);
    }
  };

  return (
    <div className="address-step">
      <h2 className="checkout-layout__title">Select Address</h2>

      <div className="address-list">
        {addresses.map((item) => (
          <div
            key={item.id}
            className={classNames("address-card", {
              "address-card--selected": selectedAddressId === item.id,
            })}
            onClick={() => handleSelect(item.id)}
          >
            <div className="address-card__radio-wrapper">
              <input
                type="radio"
                name="Address-Selection"
                checked={selectedAddressId === item.id}
                onChange={() => handleSelect(item.id)}
                className="address-card__radio"
              />
            </div>

            <div className="address-card__body">
              <div className="address-card__header">
                <span className="address-card__title">{item.title}</span>
                {item.tag && (
                  <span className="address-card__tag">{item.tag}</span>
                )}
              </div>
              <p className="address-card__text">{item.address}</p>
              <p className="address-card__phone">{item.phone}</p>
            </div>

            <div className="address-card__actions">
              <button
                type="button"
                className="address-card__action-btn"
                title="Edit"
              >
                <FiEdit2 />
              </button>
              <button
                type="button"
                className="address-card__action-btn"
                title="Delete"
                onClick={(e) => handleDelete(item.id, e)}
              >
                <FiX />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="add-address-separator">
        <div className="add-address-separator__line"></div>
        <button type="button" className="add-btn">
          <span className="add-btn__icon">
            <FiPlus />
          </span>
          <span className="add-btn__text">Add New Address</span>
        </button>
        <div className="add-address-separator__line"></div>
      </div>

      <div className="checkout-layout__actions">
        <button
          type="button"
          className="checkout-btn checkout-btn--outline"
          onClick={() => navigate("/cart")}
        >
          Back
        </button>


          <button
            type="button"
            className="checkout-btn checkout-btn--primary"
            disabled={!selectedAddressId}
            onClick={() => navigate("/checkout/shipping")}
          >
            Next
          </button>


      </div>
    </div>
  );
};

export default CheckoutPage;
