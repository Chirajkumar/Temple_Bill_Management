import React from 'react';

const AddExpense = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add Expense</h1>
          <p className="text-gray-600">Record a new expense entry</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expense Category</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                <option>Puja Materials</option>
                <option>Electricity</option>
                <option>Water</option>
                <option>Staff Salary</option>
                <option>Maintenance</option>
                <option>Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
              <input 
                type="number" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="0.00"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input 
                type="date" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea 
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-vertical"
                placeholder="Enter expense description..."
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button 
              type="button" 
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
            >
              Save Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
