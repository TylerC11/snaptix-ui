import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [sports, setSports] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/sports")
      .then((res) => res.json())
      .then((data) => setSports(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Upcoming Events</h1>
      <div className="row">
        {sports.map((sport, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card shadow-sm">
              {sport.PhotoPath && (
                <img
                  src={sport.PhotoPath}
                  className="card-img-top"
                  alt={sport.SportTitle}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body text-center">
                <h5 className="card-title">{sport.SportTitle}</h5>
                <Link to={`/details/${sport.SportId}`} className="btn btn-primary mt-2">View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
