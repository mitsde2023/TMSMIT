import axios from "axios";
import React, { useState } from "react";

function Ticket() {
  const [formData, setFormData] = useState({
    TicketType: "Normal Ticket", // Default value from local storage
    Status: "Open", // Initial status
    Description: "",
    LeadId: "",
    AssignedToDepartmentID:1, // Assigned department from local storage
    AssignedToSubDepartmentID:1,// Assigned sub department from local storage
    // AssignedToDepartmentID:JSON.parse(localStorage.getItem("user")).DepartmentID, // Assigned department from local storage
    // AssignedToSubDepartmentID:JSON.parse(localStorage.getItem("user")).SubDepartmentID,// Assigned sub department from local storage
    files: null, // Change to null for initial state
    EmployeeID: JSON.parse(localStorage.getItem("user")).EmployeeID, // EmployeeID from user object in local storage
  });


  console.log(formData,17)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      files: e.target.files,
    });
  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to handle file uploads
    const formDataObj = new FormData();

    // Append other form data to FormData object
    for (const key in formData) {
      formDataObj.append(key, formData[key]);
    }

    // Append each file to FormData object
    for (const file of formData.files) {
      formDataObj.append('files', file);
    }

    try {
      const response = await axios.post("http://localhost:2000/Ticket/Create", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure correct content type for file uploads
        },
      });
      console.log(response.data); // Handle success response
    } catch (error) {
      console.error(error); // Handle error response
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="Description"
          className="block text-sm font-bold text-gray-700"
        >
          Description:
        </label>
        <textarea
          id="Description"
          name="Description"
          value={formData.Description}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="LeadId"
          className="block text-sm font-bold text-gray-700"
        >
          LeadId:
        </label>
        <input
          id="LeadId"
          name="LeadId"
          value={formData.LeadId}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
          <label htmlFor="files" className="block text-sm font-bold text-gray-700">
            Files
          </label>
          <input
            type="file"
            id="files"
            name="files"
            onChange={handleFileChange}
            className="mt-1 p-2 w-full border rounded-md"
            accept=".jpg, .jpeg, .png, .gif, .pdf" // Add accepted file types
            multiple // Allow multiple file selection
            required
          />
        </div>
      {/* Add more input fields for other ticket data */}
      <button type="submit">Submit</button>
    </form>
  );
}
export default Ticket;
