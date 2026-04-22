import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Layout from '../../components/Layout/Layout';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import AlertMessage from '../../components/Common/AlertMessage';
import DataTable from '../../components/Common/DataTable';
import { roomsAPI } from '../../services/api';

const RoomBooking = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await roomsAPI.getBooking();
        setRooms(data);
      } catch (error) {
        console.error('RoomBooking API error:', error);
        toast.error('Failed to load rooms');
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const columns = [
    { key: 'id', header: 'Room No' },
    { key: 'type', header: 'Type' },
    { key: 'price', header: 'Price/Night (₹)' },
    { key: 'status', header: 'Status' },
    { key: 'bookedBy', header: 'Booked By' },
    { key: 'checkIn', header: 'Check In' },
    { key: 'checkOut', header: 'Check Out' },
  ];

  const handleNewBooking = () => {
    setMessage('Navigate to room booking form or implement booking logic here');
  };

  return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Room Booking</h1>
          <button
            onClick={handleNewBooking}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium"
          >
            New Booking
          </button>
        </div>
        {message && <AlertMessage type="info" message={message} />}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <DataTable data={rooms} columns={columns} />
          </div>
        )}
      </div>
  );
};

export default RoomBooking;
