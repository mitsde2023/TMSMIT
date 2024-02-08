import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import DepartmentTickets from "./DepartmentTickets";
import Reply from "./Reply";
function Home() {
  const [data, setData] = useState([]);
  const [closedCount, setClosedCount] = useState(0);
  const [openCount, setOpenCount] = useState(0);
  const [resolvedCount, setResolvedCount] = useState(0);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null); // State to store selected image URL
  const ticketUpdatesContainerRef = useRef(null);
  useEffect(() => {
    if (ticketUpdatesContainerRef.current) {
      ticketUpdatesContainerRef.current.scrollTop =
        ticketUpdatesContainerRef.current.scrollHeight;
    }
  }, [selectedTicket]);
  const handleImageClick = (url) => {
    setSelectedImageUrl(url);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  // Assuming user is a string key for localStorage
  const user = JSON.parse(localStorage.getItem("user")); // Parse the JSON string

  function fetchTicketData() {
    if (user) {
      const dpId = user.DepartmentID;
      const SubDapId = user.SubDepartmentID;
      axios
        .get(`http://localhost:2000/department/${dpId}/${SubDapId}`)
        .then((response) => {
          setData(response.data.tickets);
          console.log(response.data, 16);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }
  useEffect(() => {
    // Count tickets based on their status
    const counts = data.reduce(
      (acc, ticket) => {
        if (ticket.Status === "Closed") {
          acc.closedCount++;
        } else if (ticket.Status === "Open") {
          acc.openCount++;
        } else if (ticket.Status === "Resolve") {
          acc.resolvedCount++;
        }
        return acc;
      },
      { closedCount: 0, openCount: 0, resolvedCount: 0 }
    );
    setClosedCount(counts.closedCount);
    setOpenCount(counts.openCount);
    setResolvedCount(counts.resolvedCount);
  }, [data]);

  useEffect(() => {
    fetchTicketData();
  }, []);

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    return `${time} ${day}-${month}`;
  };
  return (
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
                  <h5 className="font-semibold">{openCount}</h5>
                </div>
                <i className="bi bi-postcard text-4xl"></i>
              </div>
            </Link>

            <div className="bg-green-200 p-4 rounded shadow flex justify-around hover:bg-green-400">
              <div>
                <strong>My Feedback</strong>
                <h5 className="font-semibold">{closedCount}</h5>
              </div>
              {/* <i className="bi bi-journal-check text-4xl"></i> */}
            </div>
          </div>
        </div>
        <Outlet></Outlet>
        {isModalOpen && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content">
              <img
                src={selectedImageUrl}
                alt="Selected Attachment"
                className="modal-image"
              />
            </div>
          </div>
        )}
        <div className="table-container">
          <table
            className={`custom-table ${selectedTicket ? "selected-table" : ""}`}
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
              {data.map((ticket) => (
                <tr
                  key={ticket.TicketID}
                  onClick={() => handleTicketClick(ticket)}
                  className={`cursor-pointer ${
                    selectedTicket === ticket ? "selected-row" : ""
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
        {/* <DepartmentTickets data={data} Tstatus={'Open'} /> */}
        <div className="mb-4">
          <h6 className="font-semibold mb-2">Tickets For Me</h6>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-green-200 p-4 rounded shadow flex justify-around hover:bg-green-400">
              <div>
                <strong>Resolve</strong>
                <h5 className="font-semibold">{resolvedCount}</h5>
              </div>
              <i className="bi bi-journal-check text-4xl"></i>
            </div>

            <div className="bg-pink-200 p-4 rounded shadow flex justify-around hover:bg-pink-400">
              <div>
                <strong>Closed</strong>
                <h5 className="font-semibold">{closedCount}</h5>
              </div>
              <i className="bi bi-journal-check text-4xl"></i>
            </div>
            <div className="bg-purple-200 p-4 rounded shadow">Card 3</div>
            <div className="bg-orange-200 p-4 rounded shadow">Card 4</div>
            <div className="bg-red-200 p-4 rounded shadow">Card 5</div>
            <div className="bg-indigo-200 p-4 rounded shadow">Card 6</div>
          </div>
        </div>

        <div>
          <h6 className="font-semibold mb-2">Tickets raised by me</h6>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-teal-200 p-4 rounded shadow">Card 1</div>
            <div className="bg-gray-200 p-4 rounded shadow">Card 2</div>
            <div className="bg-cyan-200 p-4 rounded shadow">Card 3</div>
            <div className="bg-lime-200 p-4 rounded shadow">Card 4</div>
          </div>
        </div>
      </div>
      {/* Right Column */}
      <div className="sm:w-1/3">
        {selectedTicket && (
          <div
            ref={ticketUpdatesContainerRef}
            className="m-2 p-2 bg-orange-400 border border-gray-300 overflow-y-auto max-h-96"
          >
            <div className="mt-4">
              <div className="ticket-updates-container">
                {selectedTicket.TicketUpdates.map((update) => (
                  <div
                    key={update.UpdateID}
                    className={`ticket-update ${
                      update.EmployeeID === 1 ? "sender" : "receiver"
                    }`}
                  >
                    <div className="update-info">
                      <p>{update.UpdateStatus}</p>
                      <p>{update.UpdateDescription}</p>
                      <small style={{ fontSize: "8px", color: "blue" }}>
                        {formatDate(update.updatedAt)}
                      </small>
                    </div>

                    <div className="update-attachments">
                      {update.UpdatedAttachmentUrls.map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          onClick={() => handleImageClick(url)} // Pass URL to handleImageClick
                          alt={`Attachment ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <Reply ticketData={selectedTicket} />
      </div>
      ;
    </div>
  );
}

export default Home;
