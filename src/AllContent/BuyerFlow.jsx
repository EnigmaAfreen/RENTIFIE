
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//import "./images/likeImg.png";

const PAGE_SIZE = 5; // Number of properties per page

// export default Buyer;

const Buyer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  const [likedProperties, setLikedProperties] = useState([]);

  const handleLike = (property) => {
    // Toggle like status of the property
    if (likedProperties.includes(property.id)) {
      // Remove property ID from likedProperties array
      setLikedProperties(likedProperties.filter((id) => id !== property.id));
    } else {
      // Add property ID to likedProperties array
      setLikedProperties([...likedProperties, property.id]);
    }
  };

  // Dummy data for properties
  const [properties, setProperties] = useState([
    // Dummy data for properties
    {
      id: 1,
      place: "New York",
      area: 1200,
      bedrooms: 3,
      bathrooms: 2,
      hospitals: "City Hospital",
      colleges: "NYU",
      seller: "Afreen",
      phone: "123-456-7890",
      email: "afreen@example.com",
    },
    {
      id: 2,
      place: "Los Angeles",
      area: 1400,
      bedrooms: 4,
      bathrooms: 3,
      hospitals: "LA Hospital",
      colleges: "UCLA",
      seller: "sartaz ",
      phone: "987-654-3210",
      email: "sartzs@example.com",
    },
    {
      id: 3,
      place: "Chicago",
      area: 1000,
      bedrooms: 2,
      bathrooms: 1,
      hospitals: "Chicago Hospital",
      colleges: "University of Chicago",
      seller: "Alice Johnson",
      phone: "456-789-0123",
      email: "alice@example.com",
    },
    {
      id: 4,
      place: "San Francisco",
      area: 1600,
      bedrooms: 3,
      bathrooms: 2,
      hospitals: "SF Hospital",
      colleges: "UCSF",
      seller: "Bob Brown",
      phone: "789-012-3456",
      email: "bob@example.com",
    },
    {
      id: 5,
      place: "Seattle",
      area: 1300,
      bedrooms: 2,
      bathrooms: 2,
      hospitals: "Seattle Hospital",
      colleges: "University of Washington",
      seller: "Charlie Green",
      phone: "012-345-6789",
      email: "charlie@example.com",
    },
    {
      id: 6,
      place: "Boston",
      area: 1100,
      bedrooms: 2,
      bathrooms: 1,
      hospitals: "Boston Hospital",
      colleges: "Harvard University",
      seller: "David White",
      phone: "345-678-9012",
      email: "david@example.com",
    },
    {
      id: 7,
      place: "Austin",
      area: 1500,
      bedrooms: 3,
      bathrooms: 2,
      hospitals: "Austin Hospital",
      colleges: "University of Texas",
      seller: "Emily Black",
      phone: "678-901-2345",
      email: "emily@example.com",
    },
    {
      id: 8,
      place: "Miami",
      area: 1800,
      bedrooms: 4,
      bathrooms: 3,
      hospitals: "Miami Hospital",
      colleges: "University of Miami",
      seller: "Frank Grey",
      phone: "901-234-5678",
      email: "frank@example.com",
    },
    {
      id: 9,
      place: "Denver",
      area: 1200,
      bedrooms: 3,
      bathrooms: 2,
      hospitals: "Denver Hospital",
      colleges: "University of Denver",
      seller: "Grace Red",
      phone: "234-567-8901",
      email: "grace@example.com",
    },
    {
      id: 10,
      place: "Portland",
      area: 1400,
      bedrooms: 2,
      bathrooms: 2,
      hospitals: "Portland Hospital",
      colleges: "Portland State University",
      seller: "Henry Blue",
      phone: "567-890-1234",
      email: "henry@example.com",
    },
    // Add more dummy data as needed
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  //const [properties, setProperties] = useState(initialProperties);
  const [selected, setSelected] = useState(false);
  const [filters, setFilters] = useState({
    place: "",
    bedrooms: "",
    bathrooms: "",
  });
  // Calculate total number of pages based on properties count and page size
  const totalPages = Math.ceil(properties.length / PAGE_SIZE);

  // Get properties for the current page
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, properties.length);
  const currentProperties = properties.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const [interestedProperty, setInterestedProperty] = useState("");

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
    setSelected(true);
  };

  const handleInterest = (property) => {
    setInterestedProperty(property);
  };

  const handleLogout = () => {
    navigate("/index.html");
  };

  const filteredProperties = properties.filter((property) => {
    return (
      (filters.place === "" ||
        property.place.toLowerCase().includes(filters.place.toLowerCase())) &&
      (filters.bedrooms === "" ||
        property.bedrooms >= parseInt(filters.bedrooms)) &&
      (filters.bathrooms === "" ||
        property.bathrooms >= parseInt(filters.bathrooms))
    );
  });

  return (
    <div className="BuyerPage">
      <header>
        <h1>Welcome, {user?.firstName}</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <h2>Filter Properties</h2>
      <div className="filters">
        <label>
          Place:
          <input
            type="text"
            name="place"
            value={filters.place}
            onChange={handleFilterChange}
          />
        </label>
        {/* <label>
          Bedrooms:
          <input
            type="number"
            name="bedrooms"
            value={filters.bedrooms}
            onChange={handleFilterChange}
          />
        </label> */}
        {/* <label>
          Bathrooms:
          <input
            type="number"
            name="bathrooms"
            value={filters.bathrooms}
            onChange={handleFilterChange}
          />
        </label> */}
      </div>
      <h3 className={selected ? "selected-heading" : "available-heading"}>
        {selected ? "Selected Property" : "Available Properties"}
      </h3>

      {filteredProperties.length === 0 ? (
        <p className="p1">No properties match your criteria.</p>
      ) : (
        filteredProperties?.map((property) => (
          <div key={property.id} className="property-item">
            <h3>{property.place}</h3>
            <p>Area: {property.area} sq ft</p>
            <p>Bedrooms: {property.bedrooms}</p>
            <p>Bathrooms: {property.bathrooms}</p>
            <p>Nearby Hospitals: {property.hospitals}</p>
            <p>Nearby Colleges: {property.colleges}</p>
            <button onClick={() => handleInterest(property)}>
              I'm Interested
            </button>
            <button className="button2" onClick={() => handleLike(property)}>
              {likedProperties.includes(property.id) ? "Unlike" : "Like"}
            </button>
          </div>
        ))
      )}

      {interestedProperty && (
        <div className="interested-modal">
          <h2>Contact Seller</h2>
          <p className="p2">Name: {interestedProperty.seller}</p>
          <p className="p2">Phone: {interestedProperty.phone}</p>
          <p className="p2">Email: {interestedProperty.email}</p>
          <button onClick={() => setInterestedProperty(null)}>Close</button>
        </div>
      )}
      {currentProperties.length === 0 ? (
        <p>No properties available.</p>
      ) : (
        currentProperties.map((property) => (
          <div key={property.id} className="property-item">
            <h3>{property.place}</h3>
            <p>Area: {property.area} sq ft</p>
            <p>Bedrooms: {property.bedrooms}</p>
            <p>Bathrooms: {property.bathrooms}</p>
            <p>Nearby Hospitals: {property.hospitals}</p>
            <p>Nearby Colleges: {property.colleges}</p>
          </div>
        ))
      )}
      <div className="clear" />

      {totalPages > 1 && (
        <div className="pagination">
          {[...Array(totalPages).keys()].map((page) => (
            <button key={page + 1} onClick={() => handlePageChange(page + 1)}>
              {page + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Buyer;
