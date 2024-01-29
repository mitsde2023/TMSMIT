import React from "react";

function Home() {
  return (
    <div className="container mx-auto p-2">
      {/* Container 1 with 2 cards */}
      <div className="mb-4">
        <h6 className="font-semibold mb-2">Comman Bucket</h6>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-blue-200 p-4 rounded shadow">Card 1</div>
          <div className="bg-green-200 p-4 rounded shadow">Card 2</div>
        </div>
      </div>

      {/* Container 2 with 6 cards */}
      <div className="mb-4">
        <h6 className="font-semibold mb-2">Tickets For Me</h6>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-yellow-200 p-4 rounded shadow">Card 1</div>
          <div className="bg-pink-200 p-4 rounded shadow">Card 2</div>
          <div className="bg-purple-200 p-4 rounded shadow">Card 3</div>
          <div className="bg-orange-200 p-4 rounded shadow">Card 4</div>
          <div className="bg-red-200 p-4 rounded shadow">Card 5</div>
          <div className="bg-indigo-200 p-4 rounded shadow">Card 6</div>
        </div>
      </div>

      {/* Container 3 with 4 cards */}
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
  );
}

export default Home;
