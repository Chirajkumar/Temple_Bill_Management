import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiPlus, FiSearch } from 'react-icons/fi';

const LedgerEntry = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [entries, setEntries] = useState([
    { id: 1, date: '2024-01-15', transactionType: 'Seva Booking', debit: 2500, credit: 0, balance: 2500, description: 'Abhishekam booking' },
    { id: 2, date: '2024-01-15', transactionType: 'Donation', debit: 10000, credit: 0, balance: 12500, description: 'General donation' },
    { id: 3, date: '2024-01-15', transactionType: 'Expense', debit: 0, credit: 5000, balance: 7500, description: 'Prasada ingredients' }
  ]);
  const [balance, setBalance] = useState(7500);
  const [filter, setFilter] = useState('');

  const transactionTypes = ['Seva Booking', 'Donation', 'Prasada Sale', 'Room Booking', 'Expense', 'Salary'];

  const onSubmit = (data) => {
    const newEntry = {
      id: entries.length + 1,
      ...data,
      balance: data.debit > 0 ? balance + parseInt(data.debit) : balance - parseInt(data.credit)
    };
    setEntries([...entries, newEntry]);
    setBalance(newEntry.balance);
    toast.success('Ledger entry added successfully!');
    reset();
  };

  const filteredEntries = filter 
    ? entries.filter(entry => entry.transactionType.toLowerCase().includes(filter.toLowerCase()))
    : entries;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b bg-gradient-to-r from-orange-50 to-white">
          <h1 className="text-2xl font-bold text-gray-800">Ledger Entry</h1>
          <p className="text-gray-600 mt-1">Manage all financial transactions</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 border-b">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
              <input
                type="date"
                {...register('date', { required: 'Date is required' })}
                defaultValue={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type *</label>
              <select
                {...register('transactionType', { required: 'Transaction type is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Type</option>
                {transactionTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Debit Amount (₹)</label>
              <input
                type="number"
                {...register('debit')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Income/Receipt"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Credit Amount (₹)</label>
              <input
                type="number"
                {...register('credit')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Expense/Payment"
              />
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <input
                type="text"
                {...register('description', { required: 'Description is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter description"
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 flex items-center"
            >
              <FiPlus className="mr-2" /> Add Entry
            </button>
          </div>
        </form>

        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Ledger Entries</h2>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction Type</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Debit (₹)</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Credit (₹)</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Balance (₹)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEntries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{entry.date}</td>
                    <td className="px-4 py-3 text-sm">{entry.transactionType}</td>
                    <td className="px-4 py-3 text-sm text-right text-green-600">
                      {entry.debit > 0 ? `₹${entry.debit.toLocaleString()}` : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-red-600">
                      {entry.credit > 0 ? `₹${entry.credit.toLocaleString()}` : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-medium">₹{entry.balance.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm">{entry.description}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50 font-bold">
                <tr>
                  <td colSpan="4" className="px-4 py-3 text-right">Current Balance:</td>
                  <td className="px-4 py-3 text-right">₹{balance.toLocaleString()}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LedgerEntry;