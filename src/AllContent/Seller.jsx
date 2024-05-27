import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "./Modal";

const Seller = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({
    place: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    hospitals: "",
    colleges: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProperty({
      ...newProperty,
      [name]: value,
    });
  };

  const handlePostProperty = (e) => {
    e.preventDefault();
    setProperties([...properties, { ...newProperty, id: Date.now() }]);
    setNewProperty({
      place: "",
      area: "",
      bedrooms: "",
      bathrooms: "",
      hospitals: "",
      colleges: "",
    });
    setIsModalOpen(true);
  };

  const handleDeleteProperty = (id) => {
    setProperties(properties.filter((property) => property.id !== id));
  };

  const handleUpdateProperty = (id) => {
    const updatedProperty = properties.find((property) => property.id === id);
    const newPlace = prompt("Update Place", updatedProperty.place);
    if (newPlace) {
      setProperties(
        properties.map((property) =>
          property.id === id ? { ...property, place: newPlace } : property
        )
      );
    }
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="SellerPage">
      <header>
        <h1>Welcome, {user?.firstName}</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <h2>Post a Property</h2>
      <form onSubmit={handlePostProperty}>
        <div>
          <label>
            Place:
            <input
              type="text"
              name="place"
              value={newProperty.place}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Area (sq ft):
            <input
              type="number"
              name="area"
              value={newProperty.area}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Bedrooms:
            <input
              type="number"
              name="bedrooms"
              value={newProperty.bedrooms}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Bathrooms:
            <input
              type="number"
              name="bathrooms"
              value={newProperty.bathrooms}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Nearby Hospitals:
            <input
              type="text"
              name="hospitals"
              value={newProperty.hospitals}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Nearby Colleges:
            <input
              type="text"
              name="colleges"
              value={newProperty.colleges}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Post Property</button>
      </form>
      <h2>Your Properties</h2>
      {properties.length === 0 ? (
        <p>No properties posted yet.</p>
      ) : (
        properties.map((property) => (
          <div key={property.id} className="property-item">
            <h3>{property.place}</h3>
            <p>Area: {property.area} sq ft</p>
            <p>Bedrooms: {property.bedrooms}</p>
            <p>Bathrooms: {property.bathrooms}</p>
            <p>Nearby Hospitals: {property.hospitals}</p>
            <p>Nearby Colleges: {property.colleges}</p>
            <button onClick={() => handleDeleteProperty(property.id)}>
              Delete
            </button>
            <button onClick={() => handleUpdateProperty(property.id)}>
              Update
            </button>
          </div>
        ))
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Property Posted Successfully!</h2>
        <p>
          Your property has been posted and is now visible to potential buyers.
        </p>
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default Seller;
