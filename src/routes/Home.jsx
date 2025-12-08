import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [sports, setSports] = useState([]);
  const [allSports, setAllSports] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const apiUrl = `${import.meta.env.VITE_API_URL}`;

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setSports(data);
        setAllSports(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    setSearchTerm("");
    if (category === "All") {
      setSports(allSports);
    } else {
      const filtered = allSports.filter(
        (sport) => sport.CategoryName === category
      );
      setSports(filtered);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const term = searchTerm.toLowerCase();
    const filtered = allSports.filter(
      (sport) =>
        sport.SportTitle.toLowerCase().includes(term) ||
        sport.Description.toLowerCase().includes(term) ||
        sport.CategoryName.toLowerCase().includes(term) ||
        sport.Location.toLowerCase().includes(term)
    );
    setSports(filtered);
    setSelectedCategory("Search Results");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-danger navbar-dark mb-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">SnapTix</Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item dropdown">
                <a 
                  className="nav-link dropdown-toggle" 
                  href="#" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  Sports
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a 
                      className="dropdown-item" 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        filterByCategory("NFL");
                      }}
                    >
                      NFL
                    </a>
                  </li>
                  <li>
                    <a 
                      className="dropdown-item" 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        filterByCategory("NHL");
                      }}
                    >
                      NHL
                    </a>
                  </li>
                  <li>
                    <a 
                      className="dropdown-item" 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        filterByCategory("NBA");
                      }}
                    >
                      NBA
                    </a>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <a 
                      className="dropdown-item" 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        filterByCategory("All");
                      }}
                    >
                      View All Sports
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <input 
                className="form-control me-2" 
                type="search" 
                placeholder="Search" 
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-outline-dark" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>

      {selectedCategory !== "All" && (
        <div className="container mb-3">
          <h3 className="text-white">Showing: {selectedCategory}</h3>
        </div>
      )}

      <div className="container text-center mb-3">
        <div className="row">
          {sports.length === 0 ? (
            <div className="col-12">
              <p className="text-white">No events found.</p>
            </div>
          ) : (
            sports.map((sport) => (
              <div key={sport.SportId} className="col-12 col-md-4 mb-3">
                <div className="card">
                  {sport.PhotoPath && (
                    <img
                      src={sport.PhotoPath}
                      className="card-img-top"
                      alt={sport.SportTitle}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{sport.SportTitle}</h5>
                    <p className="card-text">
                      {sport.Description.length > 60
                        ? sport.Description.slice(0, 60) + "..."
                        : sport.Description}
                    </p>
                    <Link
                      to={`/details/${sport.SportId}`}
                      className="btn btn-red"
                    >
                      Tickets
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}