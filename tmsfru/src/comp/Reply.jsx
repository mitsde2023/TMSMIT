import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reply = ({ ticketData }) => {
  if (!ticketData) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  const [formData, setFormData] = useState({
    TicketID: '',
    UpdateDescription: '',
    DepartmentID: JSON.parse(localStorage.getItem("user")).DepartmentID,
    EmployeeID: JSON.parse(localStorage.getItem("user")).EmployeeID,
    SubDepartmentID: JSON.parse(localStorage.getItem("user")).SubDepartmentID,
    Feedback: '',
    UpdateStatus: 'Resolve',
    files: null,
  });

  useEffect(() => {
    if (ticketData) {
      setFormData({
        TicketID: ticketData?.TicketID || '',
        UpdateDescription: '',
        DepartmentID: JSON.parse(localStorage.getItem("user")).DepartmentID,
        EmployeeID: JSON.parse(localStorage.getItem("user")).EmployeeID,
        SubDepartmentID: JSON.parse(localStorage.getItem("user")).SubDepartmentID,
        Feedback: '',
        UpdateStatus: 'Resolve',
        files: null,
      });
    }
  }, [ticketData]);

  console.log("ticketData", ticketData);
  console.log("formData", formData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      files: e.target.files,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('TicketID', formData.TicketID);
      formDataToSend.append('UpdateDescription', formData.UpdateDescription);
      formDataToSend.append('DepartmentID', formData.DepartmentID);
      formDataToSend.append('EmployeeID', formData.EmployeeID);
      formDataToSend.append('SubDepartmentID', formData.SubDepartmentID);
      formDataToSend.append('Feedback', formData.Feedback);
      formDataToSend.append('UpdateStatus', formData.UpdateStatus);

      // Append each file to formDataToSend
      for (const file of formData.files) {
        formDataToSend.append('files', file);
      }
      const response = await axios.post('http://localhost:2000/api/ticket-updates', formDataToSend);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
    <form onSubmit={handleSubmit}>
      <div className="mb-4 relative">
        <textarea
          id="UpdateDescription"
          name="UpdateDescription"
          value={formData.UpdateDescription}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
        <label htmlFor="files" className="absolute right-0 bottom-0 mr-2 mb-2 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-500 hover:text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <input
            type="file"
            id="files"
            name="files"
            onChange={handleFileChange}
            className="hidden"
            accept=".jpg, .jpeg, .png, .gif, .pdf"
            multiple
            required
          />
        </label>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  </div>
  );
};

export default Reply;
