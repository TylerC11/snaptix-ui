import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function Purchases() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sport, setSport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    Quantity: 1,
    PricePerTicket: 50,
    BuyerName: "",
    BuyerEmail: "",
    CardNumber: "",
    CardHolderName: "",
    ExpiryDate: "",
    CVV: "",
    SportId: id
  });

  const apiUrl = `${import.meta.env.VITE_API_URL}`;

  useEffect(() => {
    fetch(`${apiUrl}/${id}`)
      .then(res => res.json())
      .then(data => {
        setSport(data[0]);
        setFormData(prev => ({ ...prev, SportId: data[0].SportId }));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSubmitting(true);

    try {
      const res = await fetch(`${apiUrl}/purchase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          Quantity: parseInt(formData.Quantity),
          PricePerTicket: parseFloat(formData.PricePerTicket),
          SportId: parseInt(formData.SportId),
          CardNumber: formData.CardNumber.replace(/\s/g, '')
        })
      });

      if (!res.ok) {
        const data = await res.json();
        setErrors(data.errors || ["Purchase failed"]);
        setSubmitting(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => navigate("/"), 2000);

    } catch (err) {
      setErrors(["Network error"]);
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!sport) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">Event not found</div>
        <Link to="/" className="btn btn-red">Go Home</Link>
      </div>
    );
  }

  const totalPrice = (formData.Quantity * formData.PricePerTicket).toFixed(2);

  return (
    <div className="container mt-4">
      <Link to={`/details/${id}`} className="btn btn-red mb-3">← Back to Details</Link>

      <div className="card shadow-lg p-4">
        <h2 className="card-title mb-3">Purchase Tickets for {sport.SportTitle}</h2>
        
        {success && (
          <div className="alert alert-success">Purchase successful! Redirecting to home...</div>
        )}

        {errors.length > 0 && (
          <div className="alert alert-danger">
            <strong>Please fix the following errors:</strong>
            <ul className="mb-0 mt-2">
              {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <h4 className="mt-3 mb-3">Buyer Information</h4>
          
          <div className="mb-3">
            <label htmlFor="BuyerName" className="form-label">Full Name *</label>
            <input
              type="text"
              className="form-control"
              id="BuyerName"
              name="BuyerName"
              value={formData.BuyerName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="BuyerEmail" className="form-label">Email Address *</label>
            <input
              type="email"
              className="form-control"
              id="BuyerEmail"
              name="BuyerEmail"
              value={formData.BuyerEmail}
              onChange={handleChange}
              required
            />
          </div>

          <h4 className="mt-4 mb-3">Ticket Information</h4>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="Quantity" className="form-label">Number of Tickets *</label>
              <input
                type="number"
                className="form-control"
                id="Quantity"
                name="Quantity"
                min="1"
                value={formData.Quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="PricePerTicket" className="form-label">Price Per Ticket</label>
              <input
                type="text"
                className="form-control"
                id="PricePerTicket"
                value={`$${formData.PricePerTicket}`}
                readOnly
                disabled
              />
            </div>
          </div>

          <div className="alert alert-info">
            <strong>Total Price: ${totalPrice}</strong>
          </div>

          <h4 className="mt-4 mb-3">Payment Information</h4>

          <div className="mb-3">
            <label htmlFor="CardHolderName" className="form-label">Cardholder Name *</label>
            <input
              type="text"
              className="form-control"
              id="CardHolderName"
              name="CardHolderName"
              value={formData.CardHolderName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="CardNumber" className="form-label">Card Number (16 digits) *</label>
            <input
              type="text"
              className="form-control"
              id="CardNumber"
              name="CardNumber"
              placeholder="1234567890123456"
              maxLength="16"
              value={formData.CardNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="ExpiryDate" className="form-label">Expiry Date (MMYY) *</label>
              <input
                type="text"
                className="form-control"
                id="ExpiryDate"
                name="ExpiryDate"
                placeholder="1225"
                maxLength="4"
                value={formData.ExpiryDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="CVV" className="form-label">CVV (3 digits) *</label>
              <input
                type="text"
                className="form-control"
                id="CVV"
                name="CVV"
                placeholder="123"
                maxLength="3"
                value={formData.CVV}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-red w-100 mt-3"
            disabled={submitting}
          >
            {submitting ? "Processing..." : `Purchase Tickets - $${totalPrice}`}
          </button>
        </form>
      </div>
    </div>
  );
}