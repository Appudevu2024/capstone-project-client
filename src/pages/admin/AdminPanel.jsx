 import React from 'react'
 
 function AdminPanel() {
   return (
    <div className="min-h-screen flex bg-gray-100">
    {/* Sidebar */}
    <aside className="w-64 bg-blue-800 text-white p-5 hidden md:block">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
      <ul className="space-y-4">
        <li><a href="#" className="hover:underline">Doctors</a></li>
        <li><a href="#" className="hover:underline">Patients</a></li>
        <li><a href="#" className="hover:underline">Departments</a></li>
        <li><a href="#" className="hover:underline">Service staffs</a></li>
        <li><a href="#" className="hover:underline">Appointments</a></li>
        <li><a href="#" className="hover:underline">Settings</a></li>
        <li><a href="#" className="hover:underline">Logout</a></li>
      </ul>
    </aside>

    {/* Main Section */}
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Dashboard Overview</h1>
        <nav className="space-x-4">
          <a href="#" className="text-blue-600 hover:underline">Home</a>
          <a href="#" className="text-blue-600 hover:underline">Patients</a>
          <a href="#" className="text-blue-600 hover:underline">Doctors</a>
          <a href="#" className="text-blue-600 hover:underline">Appointments</a>
          <a href="#" className="text-blue-600 hover:underline">Settings</a>
        </nav>
      </header>

      {/* Content */}
      <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold">Total Patients</h3>
          <p className="text-2xl font-bold text-blue-700">128</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
          <p className="text-2xl font-bold text-green-600">26</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <p className="text-2xl font-bold text-red-500">4</p>
        </div>
        <div className="bg-white p-6 rounded shadow col-span-1 md:col-span-2 lg:col-span-1">
          <h3 className="text-lg font-semibold">Blood Bank Info</h3>
          <p className="text-sm">Click below to view latest blood stock availability.</p>
          <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">View Blood Bank</button>
        </div>
      </main>
    </div>
  </div>
   )
 }
 
 export default AdminPanel
 