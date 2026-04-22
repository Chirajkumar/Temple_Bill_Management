import React, { useState } from 'react';
import { FiCalendar, FiDownload, FiPrinter } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const DailyReport = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [reportData, setReportData] = useState({
    date: new Date().toISOString().split('T')[0],
    counterWiseCollection: [
      { counter: 'Seva Counter', amount: 45000, transactions: 18 },
      { counter: 'Donation Counter', amount: 78500, transactions: 25 },
      { counter: 'Prasada Counter', amount: 12500, transactions: 42 },
      { counter: 'Room Booking', amount: 8000, transactions: 4 }
    ],
    totalCollection: 144000,
    sevaBookings: 45,
    donations: 32,
    prasadaSales: 42
  });

  const pieData = [
    { name: 'Seva', value: 45000, color: '#FF6B6B' },
    { name: 'Donation', value: 78500, color: '#4ECDC4' },
    { name: 'Prasada', value: 12500, color: '#45B7D1' },
    { name: 'Room', value: 8000, color: '#96CEB4' }
  ];

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    // Fetch data for selected date
  };

  const handleExport = () => {
    // Export to CSV/Excel
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b bg-gradient-to-r from-orange-50 to-white flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Daily Report</h1>
            <p className="text-gray-600 mt-1">View daily collection and transaction summary</p>
          </div>
          <div className="flex space-x-3">
            <button onClick={handleExport} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center">
              <FiDownload className="mr-2" /> Export
            </button>
            <button onClick={handlePrint} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center">
              <FiPrinter className="mr-2" /> Print
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Date Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-600">Total Collection</p>
              <p className="text-2xl font-bold text-green-700">₹{reportData.totalCollection.toLocaleString()}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-600">Seva Bookings</p>
              <p className="text-2xl font-bold text-blue-700">{reportData.sevaBookings}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-purple-600">Donations</p>
              <p className="text-2xl font-bold text-purple-700">{reportData.donations}</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <p className="text-sm text-orange-600">Prasada Sales</p>
              <p className="text-2xl font-bold text-orange-700">{reportData.prasadaSales}</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Counter-wise Collection</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={reportData.counterWiseCollection}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="counter" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#FF6B6B" name="Amount (₹)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Collection Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Detailed Table */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Counter-wise Details</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Counter</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Number of Transactions</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reportData.counterWiseCollection.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{item.counter}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 text-right">{item.transactions}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 text-right">₹{item.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-bold">
                    <td className="px-6 py-4 text-sm">Total</td>
                    <td className="px-6 py-4 text-sm text-right">
                      {reportData.counterWiseCollection.reduce((sum, item) => sum + item.transactions, 0)}
                    </td>
                    <td className="px-6 py-4 text-sm text-right">₹{reportData.totalCollection.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyReport;