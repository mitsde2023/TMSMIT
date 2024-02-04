import React, { useState } from 'react';
import axios from 'axios';

const Reply = () => {
  const [formData, setFormData] = useState({
    TicketID: 2,
    UpdateDescription: 'Lead Id Alredy In your Bucket',
    DepartmentID:1,
    EmployeeID:13,
    SubDepartmentID:1,
    Feedback:5,
    UpdateStatus:"Resolve",
    files: null,
  });

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


    //   formDataToSend.append('UpdateDescription', formData.UpdateDescription);

      // formDataToSend.append('file', formData.file);


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
        <div className="mb-4">
          <label htmlFor="TicketID" className="block text-sm font-bold text-gray-700">
            Ticket ID
          </label>
          <input
            type="text"
            id="TicketID"
            name="TicketID"
            value={formData.TicketID}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="DepartmentID" className="block text-sm font-bold text-gray-700">
          Department ID
          </label>
          <input
            type="text"
            id="DepartmentID"
            name="DepartmentID"
            value={formData.DepartmentID}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="EmployeeID" className="block text-sm font-bold text-gray-700">
          Employee ID
          </label>
          <input
            type="text"
            id="EmployeeID"
            name="EmployeeID"
            value={formData.EmployeeID}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="SubDepartmentID" className="block text-sm font-bold text-gray-700">
          SubDepartment ID
          </label>
          <input
            type="text"
            id="SubDepartmentID"
            name="SubDepartmentID"
            value={formData.SubDepartmentID}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="UpdateStatus" className="block text-sm font-bold text-gray-700">
          UpdateStatus
          </label>
          <input
            type="text"
            id="UpdateStatus"
            name="UpdateStatus"
            value={formData.UpdateStatus}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="UpdateDescription" className="block text-sm font-bold text-gray-700">
            Update Description
          </label>
          <textarea
            id="UpdateDescription"
            name="UpdateDescription"
            value={formData.UpdateDescription}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        {/* <div className="mb-4">
          <label htmlFor="file" className="block text-sm font-bold text-gray-700">
            File
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            className="mt-1 p-2 w-full border rounded-md"
            accept=".jpg, .jpeg, .png, .gif, .pdf" // Add accepted file types
            required
          />
        </div> */}

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
