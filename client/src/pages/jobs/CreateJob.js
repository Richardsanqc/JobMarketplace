import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/header/Navbar";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../global.css";
import "../auth/form.css";

const CreateJob = () => {
  const { logout, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    employer: token,
    title: "",
    company: "",
    location: "",
    jobCategory: "",
    workType: "",
    pay: "",
    description: "",
  });

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const { employer, title, company, location, jobCategory, workType, pay, description  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5050/api/auth/createjob", {
        employer,
        title,
        company,
        location,
        jobCategory,
        workType,
        pay,
        description,
      });
      console.log(res.data);
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        console.error(err);
        setErrors([{ msg: "An error occurred. Please try again later." }]);
      }
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar isAuthenticated={true} handleLogout={handleLogout} user={user} />
      <div className="content">
        <div className="form-container">
            <h1 className="lrg-heading">Job Listing Form</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="title">Title</label>
                <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={onChange}
                placeholder="Title"
                required
                />

                <label htmlFor="company">Company Name</label>
                <input
                type="text"
                name="company"
                id="company"
                value={company}
                onChange={onChange}
                placeholder="Company Name"
                required
                />

                <label htmlFor="location">Location of company</label>
                <input
                type="text"
                name="location"
                id="location"
                value={location}
                onChange={onChange}
                placeholder="Location of company"
                required
                />

                <label htmlFor="jobCategory">Job Category</label>
                <select
                name="jobCategory"
                id="jobCategory"
                value={jobCategory}
                onChange={onChange}
                required
                >
                    <option>Select a category</option>
                    <option value="test">Test</option>
                    <option value="test2">Test2</option>
                    <option value="test3">Test3</option>
                </select> 

                <label htmlFor="workType">Work Type</label>
                <select
                name="workType"
                id="workType"
                value={workType}
                onChange={onChange}
                required
                >
                    <option>Select a work type</option>
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="contract-temp">Contract/Temp</option>
                    <option value="casual-vacation">Casual/Vacation</option>
                </select> 

                <label htmlFor="pay">Salary Range</label>
                <select
                name="pay"
                id="pay"
                value={pay}
                onChange={onChange}
                required
                >
                    <option>Select a salary range</option>
                    <option value="$0-$10,000">$0 - $10,000</option>
                    <option value="$10,000-$20,000">$10,000 - $20,000</option>
                    <option value="$20,000-$40,000">$20,000 - $40,000</option>
                    <option value="$40,000-$60,000">$40,000 - $60,000</option>
                    <option value="$60,000-$80,000">$60,000 - $80,000</option>
                    <option value="$80,000-$100,000">$80,000 - $100,000</option>
                    <option value="$100,000-$120,000">$100,000 - $120,000</option>
                    <option value="$120,000-$140,000">$120,000 - $140,000</option>
                    <option value="$140,000-$160,000">$140,000 - $160,000</option>
                    <option value="$160,000-$180,000">$160,000 - $180,000</option>
                    <option value="$180,000-$200,000">$180,000 - $200,000</option>
                    <option value="$200,000+">$200,000+</option>
                </select> 

                <label htmlFor="description">Job Description</label>
                <input
                type="text"
                name="description"
                id="description"
                value={description}
                onChange={onChange}
                placeholder="Description of job"
                required
                />

                <button className="btn" type="submit">
                Submit Job Listing
                </button>
                {errors.length > 0 && (
                <div className="error-messages">
                    {errors.map((error, index) => (
                    <p key={index}>{error.msg}</p>
                    ))}
                </div>
                )}
                {/* {res.data === true && (
                    <div className="success-messages">
                    <p>Successfully create a job listing!</p>
                </div>
                )} */}
            </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
