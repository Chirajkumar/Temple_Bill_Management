import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import DataTable from '../../components/Common/DataTable';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import { DonationChart } from '../../components/Charts/DonationChart';

const DonationReport = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30');

  useEffect(() => {
    // Mock donation data from api.js mockDonations
    const mockDonations = [
      { id: 1, donor: 'Rama Krishna', amount: 5000, method: 'Cash', date: '2024-10-20', mode: 'General' },
      { id: 2, donor: 'Sita Devi', amount: 2500, method: 'UPI', date: '2024-10-19', mode: 'Annamacharya' },
      { id: 3, donor: 'Anonymous', amount: 10000, method: 'Cheque', date: '2024-10-18', mode: 'Special' },
      { id: 4, donor: 'Devotee Group', amount: 7500, method: 'Cash', date: '2024-10-17', mode: 'General' },
    ];
    setDonations(mockDonations);
    setLoading(false);
  }, []);

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'donor', header: 'Donor' },
    { key: 'amount', header: 'Amount (₹)' },
    { key: 'method', header: 'Method' },
    { key: 'date', header: 'Date' },
    { key: 'mode', header: 'Mode' },
  ];

  const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Donation Report</h1>
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <DonationChart data={donations} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-2xl font-bold text-blue-600 mb-4">Total: ₹{totalAmount.toLocaleString()}</div>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <DataTable
              data={donations}
              columns={columns}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DonationReport;
