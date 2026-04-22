import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import AlertMessage from '../../components/Common/AlertMessage';

const ReceiptConfiguration = () => {
  const [config, setConfig] = useState({
    templeName: 'Sri Venkateswara Temple',
    address: '123 Temple Road, Tirupati',
    phone: '08512-123456',
    gstin: '37AAATS1234C1Z5',
    receiptFooter: 'Jai Sri Venkateswara'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setMessage('Receipt configuration saved successfully!');
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setConfig({
      ...config,
      [e.target.name]: e.target.value
    });
  };

  return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Receipt Configuration</h1>
        {message && <AlertMessage type="success" message={message} />}
        <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Temple Name</label>
              <input
                type="text"
                name="templeName"
                value={config.templeName}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <textarea
                name="address"
                value={config.address}
                onChange={handleInputChange}
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={config.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GSTIN</label>
                <input
                  type="text"
                  name="gstin"
                  value={config.gstin}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Receipt Footer</label>
              <input
                type="text"
                name="receiptFooter"
                value={config.receiptFooter}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
            >
              {loading ? <LoadingSpinner /> : 'Save Configuration'}
            </button>
          </div>
        </div>
      </div>
  );
};

export default ReceiptConfiguration;
