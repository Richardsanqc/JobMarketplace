import React, { useState, useEffect } from "react";
import axios from "axios";
import './CompanyProfile.css'; 

const CompanyProfile = () => {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [companies, setCompanies] = useState([]); 
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCompanies = async (query = "") => {
    setLoading(true);
    try {
I
      const response = await axios.get(`/api/companies?search=${query}`);
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching companies", error);
    } finally {
      setLoading(false);
    }
  };


  const handleSearch = (e) => {
    e.preventDefault();
    fetchCompanies(searchTerm);
  };


  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {

      await axios.post("/api/reviews", { review });
      setReviews([...reviews, review]); 
      setReview(""); 
    } catch (error) {
      console.error("Error submitting review", error);
    }
  };


  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="company-profile">
      <h1>Welcome to the Jobseeker Website</h1>
      <p>Here you can find and review companies, or search for a company to read more about it.</p>


      <div className="search-section">
        <h2>Search for Companies</h2>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search by company name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        {loading && <p>Loading...</p>}
        <ul>
          {companies.map((company, index) => (
            <li key={index}>{company.name}</li>
          ))}
        </ul>
      </div>

    
      <div className="review-section">
        <h2>Write a Review</h2>
        <form onSubmit={handleSubmitReview}>
          <textarea
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
          <button type="submit">Submit Review</button>
        </form>

        <h3>Recent Reviews:</h3>
        <ul>
          {reviews.map((rev, index) => (
            <li key={index}>{rev}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CompanyProfile;
