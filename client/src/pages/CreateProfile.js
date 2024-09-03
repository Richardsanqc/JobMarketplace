// client/src/pages/CreateProfile.js

import React, { useState } from "react";
import axios from "axios";

const CreateProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    size: "",
    description: "",
    website: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/profile/create-profile", formData);
      window.location.href = "/profile";
    } catch (error) {
      console.error("Error creating profile", error);
    }
  };

  return (
    <div>
      <h1>Create Company Profile</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Company Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="industry"
          placeholder="Industry"
          value={formData.industry}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="size"
          placeholder="Company Size"
          value={formData.size}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Company Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="website"
          placeholder="Website"
          value={formData.website}
          onChange={handleChange}
        />
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};

export default CreateProfile;
