import { useOutletContext, useNavigate } from "react-router-dom";
import { useCart } from "../../components/cartContext/CartContext.jsx";
import { useState } from "react";
import { MdContactless } from "react-icons/md";
import { MastercardIcon } from "react-svg-credit-card-payment-icons";
import { FcSimCardChip } from "react-icons/fc";
import classNames from "classnames";

import "./Payment.scss";
const METHODS = ["Credit Card", "PayPal", "PayPal Credit"];
const PaymentStep = () => {
  const { cart } = useCart();
  const { address, shipping } = useOutletContext();
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = 50;
  const shippingCost = shipping?.price ?? 0;
  const total = subtotal + tax + shippingCost;
  const navigate = useNavigate();
  const [method, setMethod] = useState("Credit Card");
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [isPaid, setIsPaid] = useState(false);
  const [card, setCard] = useState({ name: "", number: "", exp: "", cvv: "" });
  const [isFlipped, setIsFlipped] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let clean = value;

    if (name === "number") {
      const nums = value.replace(/\D/g, "").slice(0, 16);
      clean = nums.match(/.{1,4}/g)?.join(" ") ?? "";
    }
    if (name === "cvv") clean = value.replace(/\D/g, "").slice(0, 3);
    if (name === "exp") {
      const digits = value.replace(/\D/g, "").slice(0, 4);
      clean =
        digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    }

    setCard({ ...card, [name]: clean });
  };

  const handlePay = (e) => {
    e.preventDefault();
    setIsPaid(true);
  };
  return (
    <div className="payment-step ">
      <div className="payment-step__summary  ">
        <h3 className="payment-step__summary-title">Summary</h3>
        <div className="payment-step__items">
          {cart.map((item) => (
            <div
              className="payment-step__item"
              key={`${item.id} - ${item.selectedColor} - ${item.selectedStorage}`}
            >
              <div className="payment-step__item-img">
                <img src={item.image} alt={item.name} />
              </div>
              <span className="payment-step__item-name">{item.name}</span>
              <span className="payment-step__item-price">
                ${item.price * item.quantity}
              </span>
            </div>
          ))}
        </div>
        <div className="payment-step__info">
          <p className="payment-step__label">Address</p>
          <p className="payment-step__value">{address?.address}</p>
        </div>

        <div className="payment-step__info">
          <p className="payment-step__label">Shipment method</p>
          <p className="payment-step__value">{shipping?.title}</p>
        </div>

        <div className="payment-step__prices">
          <div className="payment-step__price-row payment-step__price-row--bold">
            <span className="payment-step__price-label">Subtotal</span>
            <span className="payment-step__price-value">${subtotal}</span>
          </div>
          <div className="payment-step__price-row ">
            <span className="payment-step__price-label">Estimated Tax</span>
            <span className="payment-step__price-value">${tax}</span>
          </div>
          <div className="payment-step__price-row ">
            <span className="payment-step__price-label">
              Estimated shipping & Handling
            </span>
            <span className="payment-step__price-value">${shippingCost}</span>
          </div>
          <div className="payment-step__price-row payment-step__price-row--bold">
            <span className="payment-step__price-label">Total</span>
            <span className="payment-step__price-value">${total}</span>
          </div>
        </div>
      </div>
      {/*<div className="payment-step__payment">*/}
      {/*  <h2 className="payment-step__payment__h2">Payment</h2>*/}
      {/*  <div className="payment-step__payment">*/}
      {/*    <span className="payment-step__payment__credit">Credit Card</span>*/}
      {/*    <span className="payment-step__payment__Pay-pal">PayPal</span>*/}
      {/*    <span className="payment-step__payment__pay-pal-c">*/}
      {/*      PayPal Credit*/}
      {/*    </span>*/}
      {/*  </div>*/}
      {/*  <div className="payment-step__payment__img">*/}
      {/*    <img src={Card} alt="Card" />*/}
      {/*  </div>*/}
      {/*  <input*/}
      {/*    id="name"*/}
      {/*    type="text"*/}
      {/*    className="input__name"*/}
      {/*    placeholder="Cardholder Name"*/}
      {/*  />*/}
      {/*  <input*/}
      {/*    id="number"*/}
      {/*    type="number"*/}
      {/*    className="input__card-number"*/}
      {/*    placeholder="Card Number"*/}
      {/*  />*/}
      {/*  <input*/}
      {/*    id="date"*/}
      {/*    type="date"*/}
      {/*    className="input__card-date"*/}
      {/*    placeholder="Card Date"*/}
      {/*  />*/}
      {/*  <input*/}
      {/*    id="cvv"*/}
      {/*    type="number"*/}
      {/*    className="input__card-cvv"*/}
      {/*    placeholder="CVV"*/}
      {/*  />*/}
      {/*  <div className="payment-step__payment__check-container">*/}
      {/*    <form className="payment-step__payment__check">*/}
      {/*      <input type="checkbox" className="input__check" />*/}
      {/*      <label>*/}
      {/*        <span className="payment-step__payment__h5">*/}
      {/*          Same as billing address*/}
      {/*        </span>*/}
      {/*      </label>*/}
      {/*    </form>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className="payment-step__payment">
        <form className="payment-step__form" onSubmit={handlePay}>
          <h2 className="payment-step__title">Payment</h2>

          <div className="payment-step__tabs">
            {METHODS.map((name) => (
              <button
                type="button"
                key={name}
                className={classNames("payment-step__tab", {
                  "payment-step__tab--active": method === name,
                })}
                onClick={() => setMethod(name)}
              >
                {name}
              </button>
            ))}
          </div>

          <div className="payment-step__card" aria-hidden="true">
            <div
              className={classNames("payment-step__card-inner", {
                "payment-step__card-inner--flipped": isFlipped,
              })}
            >
              <div className="payment-step__card-front">
                <div className="payment-step__card-top">
                  <span className="payment-step__card-chip">
                    <FcSimCardChip />
                  </span>
                  <span className="payment-step__card-contactless">
                    <MdContactless />
                  </span>
                </div>

                <div className="payment-step__card-number">{card.number}</div>

                <div className="payment-step__card-bottom">
                  <div className="payment-step__card-holder">
                    <span className="payment-step__card-name">
                      {card.name || "Your Name"}
                    </span>
                  </div>

                  <span className="payment-step__card-logo">
                    <MastercardIcon />
                  </span>
                </div>
              </div>

              <div className="payment-step__card-back">
                <span className="payment-step__card-stripe"></span>
                <div className="payment-step__card-signature">
                  <span className="payment-step__card-cvv">
                    {card.cvv || "•••"}
                  </span>
                </div>
                <div className="payment-step__card-back-info">
                  <span className="payment-step__card-caption">Expires</span>
                  <span className="payment-step__card-date">
                    {card.exp || "MM/YY"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="payment-step__fields">
            <div className="payment-step__field">
              <input
                name="name"
                placeholder="Cardholder Name"
                aria-label="Cardholder Name"
                value={card.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="payment-step__field">
              <input
                name="number"
                inputMode="numeric"
                placeholder="Card Number"
                aria-label="Card Number"
                value={card.number}
                onChange={handleChange}
                required
              />
            </div>
            <div className="payment-step__row">
              <div className="payment-step__field">
                <input
                  name="exp"
                  inputMode="numeric"
                  placeholder="Exp.Date"
                  aria-label="Expiration date"
                  value={card.exp}
                  onChange={handleChange}

                  onFocus={() => setIsFlipped(true)}
                  onBlur={() => setIsFlipped(false)}
                  required
                />
              </div>
              <div className="payment-step__field">
                <input
                  name="cvv"
                  inputMode="numeric"
                  placeholder="CVV"
                  aria-label="CVV"
                  value={card.cvv}
                  onChange={handleChange}
                  onFocus={() => setIsFlipped(true)}
                  onBlur={() => setIsFlipped(false)}
                  required
                />
              </div>
            </div>
          </div>

          <label className="payment-step__checkbox">
            <input
              type="checkbox"
              checked={sameAsBilling}
              onChange={(e) => setSameAsBilling(e.target.checked)}
            />
            <span className="payment-step__checkbox-text">
              Same as billing address
            </span>
          </label>
        </form>
      </div>
    </div>
  );
};

export default PaymentStep;
