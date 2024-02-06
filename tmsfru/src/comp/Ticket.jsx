import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Reply from "./Reply";

function Ticket() {
  const [ownTicketData, setOwnTicketData] = useState([])
  const [selectedTicket, setSelectedTicket] = useState(null);

  const [formData, setFormData] = useState({
    TicketType: "Normal Ticket", // Default value from local storage
    Status: "Open", // Initial status
    Description: "",
    LeadId: "",
    AssignedToDepartmentID: 1, // Assigned department from local storage
    AssignedToSubDepartmentID: 1,// Assigned sub department from local storage
    // AssignedToDepartmentID:JSON.parse(localStorage.getItem("user")).DepartmentID, // Assigned department from local storage
    // AssignedToSubDepartmentID:JSON.parse(localStorage.getItem("user")).SubDepartmentID,// Assigned sub department from local storage
    files: null, // Change to null for initial state
    EmployeeID: JSON.parse(localStorage.getItem("user")).EmployeeID, // EmployeeID from user object in local storage
  });
  const user = JSON.parse(localStorage.getItem("user"));
  function fetchOwnTicketData() {
    if (user) {
      const dpId = user.DepartmentID;
      const SubDapId = user.SubDepartmentID;
      const EmpId = user.EmployeeID;
      console.log(dpId, SubDapId, EmpId, 25)
      axios
        .get(`http://localhost:2000/Tickets/${EmpId}`)
        .then((response) => {
          setOwnTicketData(response.data.tickets);
          console.log(response.data, 30);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }
  // useEffect(() => {
  //   // Count tickets based on their status
  //   const counts = data.reduce(
  //     (acc, ticket) => {
  //       if (ticket.Status === "Closed") {
  //         acc.closedCount++;
  //       } else if (ticket.Status === "Open") {
  //         acc.openCount++;
  //       } else if (ticket.Status === "Resolve") {
  //         acc.resolvedCount++;
  //       }
  //       return acc;
  //     },
  //     { closedCount: 0, openCount: 0, resolvedCount: 0 }
  //   );
  //   setClosedCount(counts.closedCount);
  //   setOpenCount(counts.openCount);
  //   setResolvedCount(counts.resolvedCount);
  // }, [data]);

  useEffect(() => {
    fetchOwnTicketData();
  }, []);

  console.log(selectedTicket, 17)
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
    const formDataObj = new FormData();
    for (const key in formData) {
      formDataObj.append(key, formData[key]);
    }
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

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };


  return (
    <>
      <div className="container mx-auto p-1 flex flex-col sm:flex-row text-sm">
        {/* Left Column */}
        <div className="sm:w-2/3">
          {/* <div className="p-1 bg-red-400 font-bold text-center">
          <Link to={"Tickets"}>Me ||</Link> <Link to={"Tickets"}> Tickets</Link>
        </div> */}
          {/* Container 1 with 2 cards */}
          <div className="mb-4">
            <h6 className="font-semibold mb-2">Comman Bucket</h6>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              <Link to={"Tickets"}>
                <div className="bg-red-200 p-4 rounded shadow flex justify-around hover:bg-blue-400">
                  <div>
                    <strong>Ticket</strong>
                    {/* <h5 className="font-semibold">{openCount}</h5> */}
                  </div>
                  <i className="bi bi-postcard text-4xl"></i>
                </div>
              </Link>

              <div className="bg-green-200 p-4 rounded shadow flex justify-around hover:bg-green-400">
                <div>
                  <strong>My Feedback</strong>
                  {/* <h5 className="font-semibold">{closedCount}</h5> */}
                </div>
                {/* <i className="bi bi-journal-check text-4xl"></i> */}
              </div>
            </div>
          </div>

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

          <div className="table-container">
            <table
              className={`custom-table ${selectedTicket ? "selected-table" : ""
                }`}
            >
              <thead>
                <tr>
                  <th>Id</th>
                  <th>T-Type</th>
                  <th>Lead-Id</th>
                  <th>Status</th>
                  <th>Description</th>
                  <th>Location</th>
                  <th>From</th>
                  <th>Depat</th>
                  <th>RStatus</th>
                  <th> RTimestamp</th>
                </tr>
              </thead>
              <tbody>
                {ownTicketData.map((ticket) => (
                  <tr
                    key={ticket.TicketID}
                    onClick={() => handleTicketClick(ticket)}
                    className={`cursor-pointer ${selectedTicket === ticket ? "selected-row" : ""
                      }`}
                  >
                    <td>{ticket.TicketID}</td>
                    <td>{ticket.TicketType}</td>
                    <td>{ticket.LeadId ? <>{ticket.LeadId}</> : <>NA</>}</td>
                    <td className="text-red-600">{ticket.Status}</td>
                    <td>{ticket.Description}</td>
                    <td>{ticket.Employee.Location}</td>
                    <td>{ticket.Employee.EmployeeName}</td>
                    <td>{ticket.Employee.Department.DepartmentName}</td>
                    <td>
                      {ticket.TicketResolution
                        ? ticket.TicketResolution.ResolutionStatus
                        : "-"}
                    </td>
                    <td>
                      {ticket.TicketResolution
                        ? ticket.TicketResolution.ResolutionTimestamp
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        {/* Right Column */}
        <div className="sm:w-1/3">

          {selectedTicket && (
            <div className="p-4 bg-gray-100 border border-gray-300">
              <h2 className="font-bold text-2xl mb-4">Ticket Details:</h2>
              {/* <img src={selectedTicket.AttachmentUrl[0]} /> */}
              <div className="image-container">
                {/* <img
                src={selectedTicket.AttachmentUrl[0]}
                alt="Ticket Attachment"
                onClick={handleImageClick}
              /> */}
              </div>
              <p>
                <strong>Ticket Type:</strong> {selectedTicket.TicketType}
              </p>
              <p>
                <strong>Status:</strong> {selectedTicket.Status}
              </p>
              {/* Add more details as needed */}
              <div className="mt-4 ">
                <h3 className="font-bold text-xl mb-2">Updates:</h3>
                {/* Display updates related to the selected ticket */}
                <div className="ticket-updates-container">
                  {selectedTicket.TicketUpdates.map((update) => (
                    <div
                      key={update.UpdateID}
                      className={`ticket-update ${update.EmployeeID === 1 ? 'sender' : 'receiver'}`}
                    >
                      <div className="update-info">
                        <p><strong>Update Status:</strong> {update.UpdateStatus}</p>
                        <p><strong>Description:</strong> {update.UpdateDescription}</p>
                        {/* Add more details as needed */}
                      </div>
                      <div className="update-attachments">
                        {update.UpdatedAttachmentUrls.map((url, index) => (
                          <img key={index} src={url} alt={`Attachment ${index + 1}`} />
                        ))}
                      </div>
                    </div>
                  ))}

                </div>

              </div>
              {/* Add a form or UI for sending updates */}
              {/* ... */}
            </div>
          )}
          <Reply ticketData={selectedTicket} />

        </div>
      </div>








    </>

  );
}
export default Ticket;
