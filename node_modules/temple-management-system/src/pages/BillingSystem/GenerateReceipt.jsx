import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiPrinter } from 'react-icons/fi';

const GenerateReceipt = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  const transactionTypes = ['Seva Booking', 'Donation', 'Prasada Sale', 'Room Booking'];

  const onSubmit = (data) => {
    const receipt = {
      receiptId: `RCPT${Date.now()}`,
      ...data,
      date: new Date().toLocaleDateString(),
      totalAmount: (data.amount || 0) + ((data.amount || 0) * (data.tax || 0) / 100),
      taxAmount: ((data.amount || 0) * (data.tax || 0) / 100)
    };
    setReceiptData(receipt);
    setShowReceipt(true);
  };

  const handlePrint = () => window.print();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b bg-gradient-to-r from-orange-50 to-white">
          <h1 className="text-2xl font-bold text-gray-800">Generate Receipt</h1>
          <p className="text-gray-600 mt-1">Generate receipt for any transaction</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type *</label>
              <select {...register('transactionType', { required: true })} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="">Select Type</option>
                {transactionTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reference ID *</label>
              <input type="text" {...register('referenceId', { required: true })} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Booking ID / Donation ID" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Counter ID</label>
              <input type="text" {...register('counterId')} className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g., CTR001" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount *</label>
              <input 
                type="number" 
                {...register('amount', { required: 'Amount required', min: 1 })} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500" 
              />
              {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tax (%)</label>
              <input 
                type="number" 
                step="0.01" 
                min="0" 
                max="100" 
                {...register('tax')} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500" 
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Total Amount</label>
              <input 
                type="number" 
                className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md font-bold text-lg text-green-600" 
                value={
                  (watch('amount') || 0) + ((watch('amount') || 0) * (watch('tax') || 0) / 100)
                } 
                readOnly 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Mode *</label>
              <select {...register('paymentMode', { required: true })} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option value="Cash">Cash</option><option value="UPI">UPI</option><option value="Card">Card</option>
              </select>
            </div>

           
          </div>

          <div className="flex justify-end mt-6 pt-6 border-t">
            <button type="submit" className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">Generate Receipt</button>
          </div>
        </form>
      </div>

      {showReceipt && receiptData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="text-center border-b pb-4">
                <h2 className="text-2xl font-bold">Sri Temple</h2>
                <p className="text-sm">Official Receipt</p>
              </div>
              <div className="space-y-2 py-4">
                <div className="flex justify-between"><span className="font-medium">Receipt No:</span><span>{receiptData.receiptId}</span></div>
                <div className="flex justify-between"><span className="font-medium">Date:</span><span>{receiptData.date}</span></div>
                <div className="flex justify-between"><span className="font-medium">Time:</span><span>{receiptData.time}</span></div>
                <div className="flex justify-between"><span className="font-medium">Transaction Type:</span><span>{receiptData.transactionType}</span></div>
                <div className="flex justify-between"><span className="font-medium">Reference ID:</span><span>{receiptData.referenceId}</span></div>
                <div className="border-t pt-2 mt-2"><div className="flex justify-between font-bold text-lg"><span>Amount:</span><span>₹{parseInt(receiptData.amount).toLocaleString()}</span></div></div>
                <div className="flex justify-between"><span>Payment Mode:</span><span>{receiptData.paymentMode}</span></div>
                {receiptData.counterId && <div className="flex justify-between"><span>Counter:</span><span>{receiptData.counterId}</span></div>}
              </div>
              <div className="text-center border-t pt-4"><p className="text-sm">Thank you for your patronage!</p></div>
            </div>
            <div className="flex justify-end space-x-3 p-4 border-t">
              <button onClick={() => setShowReceipt(false)} className="px-4 py-2 border rounded-md">Close</button>
              <button onClick={handlePrint} className="px-4 py-2 bg-orange-600 text-white rounded-md flex items-center"><FiPrinter className="mr-2" /> Print</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateReceipt;