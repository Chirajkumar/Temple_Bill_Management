import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import DataTable from '../../components/Common/DataTable';
import LoadingSpinner from '../../components/Common/LoadingSpinner';

const FestivalManagement = () => {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockFestivals = [
      { id: 1, name: 'Brahmotsavam', startDate: '2024-10-25', endDate: '2024-10-31', specialSevas: 'Abhishekam, Archana', status: 'Upcoming' },
      { id: 2, name: 'Vaikunta Ekadashi', startDate: '2024-12-20', endDate: '2024-12-29', specialSevas: 'Maha Aarati', status: 'Upcoming' },
      { id: 3, name: 'Annual Brahmotsavam', startDate: '2024-09-15', endDate: '2024-09-21', specialSevas: 'Procession', status: 'Completed' },
    ];
    setFestivals(mockFestivals);
    setLoading(false);
  }, []);

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Festival Name' },
    { key: 'startDate', header: 'Start Date' },
    { key: 'endDate', header: 'End Date' },
    { key: 'specialSevas', header: 'Special Sevas' },
    { key: 'status', header: 'Status' },
  ];

  return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Festival Management</h1>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <DataTable
            data={festivals}
            columns={columns}
          />
        )}
      </div>
  );
};

export default FestivalManagement;
