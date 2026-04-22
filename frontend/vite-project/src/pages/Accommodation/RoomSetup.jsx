import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Layout from '../../components/Layout/Layout';
import DataTable from '../../components/Common/DataTable';
import AlertMessage from '../../components/Common/AlertMessage';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import { roomsAPI } from '../../services/api';

const RoomSetup = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [addFormKey, setAddFormKey] = useState(0);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await roomsAPI.getSetup();
        if (data.length === 0) {
          const sampleRooms = [
            { id: 'ROOM101', type: 'AC Single', capacity: 1, price: 1500, status: 'Active' },
            { id: 'ROOM102', type: 'AC Double', capacity: 2, price: 2500, status: 'Active' },
            { id: 'ROOM201', type: 'Non-AC Double', capacity: 2, price: 1400, status: 'Maintenance' },
            { id: 'ROOM301', type: 'VIP Suite', capacity: 4, price: 5000, status: 'Active' }
          ];
          setRooms(sampleRooms);
        } else {
          setRooms(data);
        }
      } catch (error) {
        console.error('RoomSetup API error:', error);
        toast.error('Failed to load rooms');

        const sampleRooms = [
          { id: 'ROOM101', type: 'AC Single', capacity: 1, price: 1500, status: 'Active' },
          { id: 'ROOM102', type: 'AC Double', capacity: 2, price: 2500, status: 'Active' },
          { id: 'ROOM201', type: 'Non-AC Double', capacity: 2, price: 1400, status: 'Maintenance' },
          { id: 'ROOM301', type: 'VIP Suite', capacity: 4, price: 5000, status: 'Active' }
        ];
        setRooms(sampleRooms);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const columns = [
    { key: 'id', header: 'Room ID' },
    { key: 'type', header: 'Room Type' },
    { key: 'capacity', header: 'Capacity' },
    { key: 'price', header: 'Price per Day (₹)' },
    { key: 'status', header: 'Status' },
    {
      key: 'actions',
      header: 'Actions',
      render: (value, row) => (
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
          <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
        </div>
      )
    }
  ];

  const handleAddRoom = (data) => {

    const newRoom = {
      ...data,
      id: `ROOM${String(rooms.length + 1).padStart(3, '0')}`,
      status: data.status || 'Active'
    };
    setRooms([newRoom, ...rooms]);
    setMessage('Room added successfully!');
    setShowAddModal(false);
    setAddFormKey(prev => prev + 1);
    toast.success('Room added!');
  };

  const updateStatus = (roomId, status) => {
    setRooms(rooms.map(room => room.id === roomId ? { ...room, status } : room));
    setMessage(`Room ${roomId} status updated to ${status}`);
  };

  return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Room Setup</h1>
          <button
            onClick={handleAddRoom}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-medium"
          >
            Add New Room
          </button>
        </div>
        {message && <AlertMessage type="success" message={message} />}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <DataTable data={rooms} columns={columns} />
          </div>
        )}


        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Add New Room</h2>
                <AddRoomForm key={addFormKey} onClose={() => setShowAddModal(false)} onSuccess={handleAddRoom} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };


export default RoomSetup;
