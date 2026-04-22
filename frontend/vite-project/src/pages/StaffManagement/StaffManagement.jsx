import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import DataTable from '../../components/Common/DataTable';
import LoadingSpinner from '../../components/Common/LoadingSpinner';

const StaffManagement = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockStaff = [
      { id: 1, name: 'Priest Rajesh', role: 'Head Priest', phone: '9876543210', department: 'Puja', status: 'Active' },
      { id: 2, name: 'Clerk Suresh', role: 'Accounts Clerk', phone: '9876543211', department: 'Accounts', status: 'Active' },
      { id: 3, name: 'Counter Staff Lakshmi', role: 'Prasada Counter', phone: '9876543212', department: 'Prasada Sales', status: 'Active' },
      { id: 4, name: 'Security Guard Kumar', role: 'Security', phone: '9876543213', department: 'Security', status: 'Active' },
    ];
    setStaff(mockStaff);
    setLoading(false);
  }, []);

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'role', header: 'Role' },
    { key: 'phone', header: 'Phone' },
    { key: 'department', header: 'Department' },
    { key: 'status', header: 'Status' },
  ];

  return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Staff Management</h1>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <DataTable
            data={staff}
            columns={columns}
          />
        )}
      </div>
  );
};

export default StaffManagement;
