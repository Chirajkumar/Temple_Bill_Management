import React, { useState, useEffect } from 'react';
import { 
  FiUsers, FiDollarSign, FiHeart, FiShoppingCart, 
  FiAlertCircle, FiTrendingUp, FiCalendar, FiClock 
} from 'react-icons/fi';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
const [stats, setStats] = useState({
    todayCollection: 0,
    totalSevaBookings: 0,
    totalDonations: 0,
    stockAlerts: 0,
    monthlyTarget: 0,
    monthlyAchieved: 0,
    loading: true
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats');
        const data = await response.json();
        setStats(prev => ({ ...prev, ...data, loading: false }));
      } catch (err) {
        console.error('Stats error:', err);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };
    fetchStats();
  }, []);

  const revenueData = [
    { name: 'Mon', revenue: 25000, expenses: 5000 },
    { name: 'Tue', revenue: 32000, expenses: 4500 },
    { name: 'Wed', revenue: 28000, expenses: 6000 },
    { name: 'Thu', revenue: 35000, expenses: 5500 },
    { name: 'Fri', revenue: 42000, expenses: 4800 },
    { name: 'Sat', revenue: 48000, expenses: 5200 },
    { name: 'Sun', revenue: 55000, expenses: 5800 }
  ];

  const sevaData = [
    { name: 'Abhishekam', bookings: 25, revenue: 62500 },
    { name: 'Archana', bookings: 40, revenue: 20000 },
    { name: 'Homam', bookings: 15, revenue: 52500 },
    { name: 'Puja', bookings: 30, revenue: 15000 }
  ];

  const donationData = [
    { name: 'General', value: 40000, color: '#FF6B6B' },
    { name: 'Annadanam', value: 25000, color: '#4ECDC4' },
    { name: 'Construction', value: 30000, color: '#45B7D1' },
    { name: 'Special', value: 15000, color: '#96CEB4' }
  ];

  const recentTransactions = [
    { id: 'TRX001', type: 'Seva Booking', amount: 2500, date: '2024-01-15 10:30 AM', status: 'Completed' },
    { id: 'TRX002', type: 'Donation', amount: 10000, date: '2024-01-15 09:45 AM', status: 'Completed' },
    { id: 'TRX003', type: 'Prasada', amount: 500, date: '2024-01-15 09:15 AM', status: 'Completed' },
    { id: 'TRX004', type: 'Room Booking', amount: 2000, date: '2024-01-14 06:00 PM', status: 'Completed' },
    { id: 'TRX005', type: 'Seva Booking', amount: 3500, date: '2024-01-14 04:30 PM', status: 'Completed' }
  ];

  const StatCard = ({ title, value, icon: Icon, color, trend, subtitle }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold mt-2">
            {typeof value === 'number' ? `₹${value.toLocaleString()}` : value}
          </p>
          {trend && (
            <p className="text-green-600 text-sm mt-2 flex items-center">
              
            </p>
          )}
          {subtitle && <p className="text-gray-400 text-xs mt-1">{subtitle}</p>}
        </div>
        <div className={`h-12 w-12 rounded-full bg-${color}-100 flex items-center justify-center`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const monthlyProgress = (stats.monthlyAchieved / stats.monthlyTarget) * 100;

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Today's Collection" 
          value={stats.todayCollection} 
          icon={FiDollarSign} 
          color="green"
          trend={true}
        />
        <StatCard 
          title="Today's Seva Bookings" 
          value={stats.totalSevaBookings} 
          icon={FiHeart} 
          color="red"
          subtitle="12 pending"
        />
        <StatCard 
          title="Total Donations (Month)" 
          value={stats.totalDonations} 
          icon={FiUsers} 
          color="blue"
        />
        <StatCard 
          title="Stock Alerts" 
          value={stats.stockAlerts} 
          icon={FiAlertCircle} 
          color="yellow"
         
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Monthly Collection Target</h3>
          <span className="text-sm text-gray-600">
            ₹{stats.monthlyAchieved.toLocaleString()} / ₹{stats.monthlyTarget.toLocaleString()}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-orange-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${monthlyProgress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">{monthlyProgress.toFixed(1)}% achieved</p>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
   
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Weekly Revenue vs Expenses</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#FF6B6B" name="Revenue" />
              <Line type="monotone" dataKey="expenses" stroke="#4ECDC4" name="Expenses" />
            </LineChart>
          </ResponsiveContainer>
        </div>

     
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Seva Bookings Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sevaData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="bookings" fill="#8884d8" name="Bookings" />
              <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenue (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

     
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Donation Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={donationData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {donationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

    
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex justify-between items-center border-b pb-3">
                <div>
                  <p className="font-medium text-sm">{transaction.type}</p>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <FiCalendar className="mr-1 h-3 w-3" />
                    {transaction.date}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">₹{transaction.amount.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{transaction.id}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-sm text-orange-600 hover:text-orange-700 font-medium">
            View All Transactions →
          </button>
        </div>
      </div>

  
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <button className="bg-orange-600 text-white px-4 py-3 rounded-lg hover:bg-orange-700 transition text-sm font-medium">
            New Seva Booking
          </button>
          <button className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition text-sm font-medium">
            Add Donation
          </button>
          <button className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
            Generate Receipt
          </button>
          <button className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition text-sm font-medium">
            Add Devotee
          </button>
          <button className="bg-pink-600 text-white px-4 py-3 rounded-lg hover:bg-pink-700 transition text-sm font-medium">
            Stock Entry
          </button>
          <button className="bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition text-sm font-medium">
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;