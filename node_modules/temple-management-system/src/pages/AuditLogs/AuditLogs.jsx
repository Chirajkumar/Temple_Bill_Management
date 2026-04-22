import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import DataTable from '../../components/Common/DataTable';
import LoadingSpinner from '../../components/Common/LoadingSpinner';

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock audit logs data
    const mockLogs = [
      { id: 1, user: 'admin', action: 'Login', timestamp: '2024-10-20 10:30', ip: '192.168.1.1', details: 'Successful login' },
      { id: 2, user: 'staff1', action: 'Add Devotee', timestamp: '2024-10-20 10:25', ip: '192.168.1.2', details: 'Added Rama Krishna' },
      { id: 3, user: 'admin', action: 'Update Seva', timestamp: '2024-10-20 10:20', ip: '192.168.1.1', details: 'Updated Abhishekam price' },
      { id: 4, user: 'staff2', action: 'Logout', timestamp: '2024-10-20 10:15', ip: '192.168.1.3', details: 'Successful logout' },
    ];
    setLogs(mockLogs);
    setLoading(false);
  }, []);

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'user', header: 'User' },
    { key: 'action', header: 'Action' },
    { key: 'timestamp', header: 'Timestamp' },
    { key: 'ip', header: 'IP Address' },
    { key: 'details', header: 'Details' },
  ];

  return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Audit Logs</h1>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <DataTable
            data={logs}
            columns={columns}
          />
        )}
      </div>
  );
};

export default AuditLogs;
