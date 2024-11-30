import React from "react";
import ProfileCard from "./ProfileCard";
import { useUser } from "../../context/UserContext";

const Dashboard = () => {
  const { user } = useUser(); // Access user data from context

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white shadow-lg p-4">
        <ProfileCard />
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white shadow-lg p-6">
        {/* Navigation Tabs */}
        <div className="border-b pb-2 mb-4">
          <nav className="flex space-x-6">
            {/* Show tabs based on user role */}
            {user?.role === "tenant" && (
              <>
                <button className="text-gray-700 font-semibold border-b-2 border-black">
                  My Bookings
                </button>
                <button className="text-gray-500">Save Lists</button>
              </>
            )}

            {user?.role === "landlord" && (
              <>
                <button className="text-gray-700 font-semibold border-b-2 border-black">
                  My Properties
                </button>
                <button className="text-gray-500">Properties Booked</button>
              </>
            )}

            {user?.role === "vehicleSupplier" && (
              <>
                <button className="text-gray-700 font-semibold border-b-2 border-black">
                  My Vehicles
                </button>
                <button className="text-gray-500">Vehicles Booked</button>
              </>
            )}
          </nav>
        </div>

        {/* Content Area - Dynamic based on selected tab */}
        <div className="grid grid-cols-3 gap-6">
          {/* Example placeholder content for demonstration */}
          <div className="border rounded-lg p-4 relative">
            <div className="w-full h-40 bg-gray-300 mb-4 relative">
              <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                On Hold
              </span>
            </div>
            <h3 className="text-lg font-semibold">Sofa</h3>
            <p className="text-sm text-gray-500">Used</p>
            <p className="text-lg font-semibold mt-2">₹ 54,000</p>
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-1/4 p-4 text-sm text-gray-500 bg-white shadow-lg">
        <ul className="space-y-2">
          <li>HB Select</li>
          <li>Terms of Use</li>
          <li>Safety Tips</li>
          <li>Posting Rules</li>
          <li>FAQ</li>
          <li>Contact</li>
          <li>Report Bugs</li>
        </ul>
      </aside>
    </div>
  );
};

export default Dashboard;
