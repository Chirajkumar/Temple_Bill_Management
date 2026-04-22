import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import DataTable from '../../components/Common/DataTable';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import { RevenueChart } from '../../components/Charts/RevenueChart';

const SevaReport = () => {
  const [sevaBookings, setSevaBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30');

  useEffect(() => {
    // Mock Seva bookings data
    const mockSevaBookings = [
      { id: 1, sevaName: 'Abhishekam', devotee: 'Rama Krishna', priest: 'Priest Rajesh', amount: 2500, date: '2024-10-20', time: '10:00 AM', status: 'Completed' },
      { id: 2, sevaName: 'Archana', devotee: 'Sita Devi', priest: 'Priest Kumar', amount: 500, date: '2024-10-20', time: '11:30 AM', status: 'Completed' },
      { id: 3, sevaName: 'Homam', devotee: 'Anonymous', priest: 'Priest Rajesh', amount: 3500, date: '2024-10-19', time: '9:00 AM', status: 'Completed' },
      { id: 4, sevaName: 'Suprabhatam', devotee: 'Devotee Group', priest: 'Priest Kumar', amount: 1000, date: '2024-10-19', time: '5:30 AM', status: 'Completed' },
      { id: 5, sevaName: 'Abhishekam', devotee: 'Lakshmi Devi', priest: 'Priest Rajesh', amount: 2500, date: '2024-10-18', time: '10:30 AM', status: 'Cancelled' }
    ];
    setSevaBookings(mockSevaBookings);
    setLoading(false);
  }, []);

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'sevaName', header: 'Seva Name' },
    { key: 'devotee', header: 'Devotee' },
    { key: 'priest', header: 'Priest' },
    { key: 'amount', header: 'Amount (₹)' },
    { key: 'date', header: 'Date' },
    { key: 'time', header: 'Time' },
    { key: 'status', header: 'Status' },
  ];

  const totalRevenue = sevaBookings.reduce((sum, booking) => sum + booking.amount, 0);
  const completedBookings = sevaBookings.filter(b => b.status === 'Completed').length;

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Seva Report</h1>
          <div className="flex gap-4 mb-6">
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
            <p className="text-2xl font-bold text-green-600">₹{totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Total Bookings</h3>
            <p className="text-2xl font-bold text-blue-600">{sevaBookings.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Completed</h3>
            <p className="text-2xl font-bold text-green-600">{completedBookings}</p>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <DataTable data={sevaBookings} columns={columns} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SevaReport;
