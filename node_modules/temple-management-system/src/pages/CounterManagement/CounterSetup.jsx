import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiEdit2, FiTrash2, FiToggleLeft, FiToggleRight } from 'react-icons/fi';

const CounterSetup = () => {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const [counters, setCounters] = useState([
    { id: 1, name: 'Seva Counter', code: 'CTR001', location: 'Main Hall', assignedUser: 'Ramesh', openingTime: '06:00', closingTime: '20:00', status: 'Active' },
    { id: 2, name: 'Donation Counter', code: 'CTR002', location: 'Entrance', assignedUser: 'Suresh', openingTime: '06:00', closingTime: '20:00', status: 'Active' },
    { id: 3, name: 'Prasada Counter', code: 'CTR003', location: 'Prasada Hall', assignedUser: 'Mahesh', openingTime: '07:00', closingTime: '21:00', status: 'Active' }
  ]);
  const [editingId, setEditingId] = useState(null);

  const users = ['Ramesh', 'Suresh', 'Mahesh', 'Rajesh', 'Kumar'];
  const counterTypes = ['Seva', 'Donation', 'Prasada', 'Room', 'General'];

  const onSubmit = (data) => {
    if (editingId) {
      setCounters(counters.map(counter => 
        counter.id === editingId ? { ...counter, ...data } : counter
      ));
      toast.success('Counter updated successfully!');
    } else {
      const newCounter = {
        id: counters.length + 1,
        ...data,
        status: 'Active'
      };
      setCounters([...counters, newCounter]);
      toast.success('Counter added successfully!');
    }
    setEditingId(null);
    reset();
  };

  const handleEdit = (counter) => {
    setEditingId(counter.id);
    setValue('name', counter.name);
    setValue('code', counter.code);
    setValue('location', counter.location);
    setValue('assignedUser', counter.assignedUser);
    setValue('openingTime', counter.openingTime);
    setValue('closingTime', counter.closingTime);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this counter?')) {
      setCounters(counters.filter(counter => counter.id !== id));
      toast.success('Counter deleted successfully!');
    }
  };

  const toggleStatus = (id) => {
    setCounters(counters.map(counter =>
      counter.id === id 
        ? { ...counter, status: counter.status === 'Active' ? 'Inactive' : 'Active' }
        : counter
    ));
    toast.success('Counter status updated!');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Add/Edit Counter Form */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b bg-gradient-to-r from-orange-50 to-white">
          <h1 className="text-2xl font-bold text-gray-800">
            {editingId ? 'Edit Counter' : 'Add New Counter'}
          </h1>
          <p className="text-gray-600 mt-1">Setup and manage billing counters</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Counter Name *
              </label>
              <select
                {...register('name', { required: 'Counter name is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select Counter Type</option>
                {counterTypes.map(type => (
                  <option key={type} value={`${type} Counter`}>{type} Counter</option>
                ))}
              </select>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Counter Code *
              </label>
              <input
                type="text"
                {...register('code', { required: 'Counter code is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="e.g., CTR001"
              />
              {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                {...register('location', { required: 'Location is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="e.g., Main Hall, Entrance"
              />
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assigned User
              </label>
              <select
                {...register('assignedUser')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select User</option>
                {users.map(user => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Opening Time *
              </label>
              <input
                type="time"
                {...register('openingTime', { required: 'Opening time is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.openingTime && <p className="text-red-500 text-xs mt-1">{errors.openingTime.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Closing Time *
              </label>
              <input
                type="time"
                {...register('closingTime', { required: 'Closing time is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.closingTime && <p className="text-red-500 text-xs mt-1">{errors.closingTime.message}</p>}
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  reset();
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition"
            >
              {editingId ? 'Update Counter' : 'Add Counter'}
            </button>
          </div>
        </form>
      </div>

      {/* Counters List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Counter List</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Counter Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {counters.map((counter) => (
                <tr key={counter.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{counter.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{counter.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{counter.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{counter.assignedUser || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {counter.openingTime} - {counter.closingTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      counter.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {counter.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button onClick={() => handleEdit(counter)} className="text-blue-600 hover:text-blue-900">
                      <FiEdit2 className="inline mr-1" /> Edit
                    </button>
                    <button onClick={() => toggleStatus(counter.id)} className="text-yellow-600 hover:text-yellow-900">
                      {counter.status === 'Active' ? <FiToggleRight className="inline mr-1" /> : <FiToggleLeft className="inline mr-1" />}
                      {counter.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button onClick={() => handleDelete(counter.id)} className="text-red-600 hover:text-red-900">
                      <FiTrash2 className="inline mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CounterSetup;