import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function Details() {
  const { id } = useParams();
  const [sport, setSport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `${import.meta.env.VITE_API_URL}/${id}`;

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setSport(data[0]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !sport) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error || "Sport not found"}
        </div>
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-secondary mb-3">
        ← Back to Events
      </Link>

      <div className="card shadow-sm">
        {sport.PhotoPath && (
          <img
            src={sport.PhotoPath}
            className="card-img-top"
            alt={sport.SportTitle}
            style={{ height: "300px", objectFit: "cover" }}
          />
        )}
        <div className="card-body">
          <h2 className="card-title">{sport.SportTitle}</h2>
          <p>
            <strong>Category:</strong> {sport.CategoryName}
          </p>
          <p>
            <strong>Location:</strong> {sport.Location}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(sport.SportDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p>
            <strong>Organizer:</strong> {sport.OwnerName}
          </p>
          <p>{sport.Description}</p>

          <Link
            to={`/purchases/${sport.SportId}`}
            className="btn btn-danger btn-lg w-100 mt-3"
          >
            Purchase Tickets
          </Link>
        </div>
      </div>
    </div>
  );
}
