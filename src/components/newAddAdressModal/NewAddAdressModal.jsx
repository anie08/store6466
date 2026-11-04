import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import "./NewAddAdressModal.scss";
const emptyForm = { title: "", tag: "HOME", address: "", phone: "" };

const NewAddAdressModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState(emptyForm);
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, id: Date.now() });
  };
  return (
    <div className="address-modal" onClick={onClose}>
      <form
        className="address-modal__window"
        role="dialog"
        aria-modal="true"
        aria-labelledby="address-modal-title"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div className="address-modal__header">
          <h3 className="address-modal__title" id="address-modal-title">
            Add New Address
          </h3>
          <button
            type="button"
            className="address-modal__close"
            aria-label="Close"
            onClick={onClose}
          >
            <FiX />
          </button>
        </div>
        <label className="address-modal__field">
          <span className="address-modal__label"> Title</span>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="2118 Thornridge"
            required
            autoFocus
          />
        </label>
        <label className="address-modal__field">
          <span className="address-modal__label">Type</span>
          <select name="tag" value={form.tag} onChange={handleChange}>
            <option value="HOME">Home</option>
            <option value="OFFICE">Office</option>
            <option value="OTHER">Other</option>
          </select>
        </label>
        <label className="address-modal__field">
          <span className="address-modal__label">Address</span>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="2715 Ash Dr. San Jose, South Dakota 83475"
            required
          />
        </label>
        <label className="address-modal__field">
          <span className="address-modal__label">Phone</span>
          <input
            name="phone"
            value={form.phone}
            type="tel"
            onChange={handleChange}
            placeholder="(797)888-999-000"
          />
        </label>
        <div className="address-modal__actions">
          <button
            type="button"
            className="checkout-btn checkout-btn--outline"
            onClick={onClose}
          >
            Cancel
          </button>
          <button type="submit" className="checkout-btn checkout-btn--primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewAddAdressModal;
