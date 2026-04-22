import axios from 'axios';
import toast from 'react-hot-toast';

// Mock base URL - simulates backend API with delay
const API_BASE = '/api';
const MOCK_DELAY = 800;

// Mock data stores (persisted in localStorage)
let mockAlerts = JSON.parse(localStorage.getItem('mockAlerts')) || [
  { id: 1, title: 'System Update', message: 'System maintenance scheduled for tonight at 10 PM. All services will be temporarily unavailable.', type: 'warning', timestamp: '2024-10-25T10:00:00Z', status: 'active' },
  { id: 2, title: 'High Value Donation', message: 'New donation of ₹25,000 received from Devotee Rama Krishna (ID: 1). Thank you for your generosity!', type: 'success', timestamp: '2024-10-25T09:45:00Z', status: 'unread' },
  { id: 3, title: 'Low Stock Alert', message: 'Prasada item "Laddu" stock below threshold (5 units remaining). Please reorder.', type: 'error', timestamp: '2024-10-25T09:30:00Z', status: 'active' },
  { id: 4, title: 'Seva Booking Confirmed', message: 'Abhishekam seva booked by Devotee Sita Devi for tomorrow 10 AM.', type: 'success', timestamp: '2024-10-25T09:15:00Z', status: 'active' },
  { id: 5, title: 'Room Booking Overdue', message: 'Room 102 checkout overdue by 2 hours. Please follow up with guest.', type: 'warning', timestamp: '2024-10-25T08:45:00Z', status: 'active' },
  { id: 6, title: 'Backup Completed', message: 'Daily database backup successfully completed at 2:00 AM.', type: 'success', timestamp: '2024-10-25T02:00:00Z', status: 'read' },
  { id: 7, title: 'New User Added', message: 'New staff user "Priest Manager" added by Admin.', type: 'info', timestamp: '2024-10-25T01:30:00Z', status: 'read' },
  { id: 8, title: 'Festival Setup Required', message: 'Diwali festival starts in 3 days. Please verify all preparations.', type: 'warning', timestamp: '2024-10-24T18:00:00Z', status: 'active' },
  { id: 9, title: 'Cash Balance Low', message: 'Cash book balance below ₹10,000. Please deposit funds.', type: 'error', timestamp: '2024-10-24T17:20:00Z', status: 'active' },
  { id: 10, title: 'Receipt Config Updated', message: 'Receipt template updated by Admin user.', type: 'info', timestamp: '2024-10-24T16:45:00Z', status: 'read' }
];

let mockDevotees = JSON.parse(localStorage.getItem('mockDevotees')) || [
  { id: 1, name: 'Rama Krishna', mobile: '9876543210', address: '123 Temple St', email: 'rama@example.com', createdAt: '2024-01-15' },
  { id: 2, name: 'Sita Devi', mobile: '9876543211', address: '456 Main Rd', email: 'sita@example.com', createdAt: '2024-01-14' }
];

let mockSevas = JSON.parse(localStorage.getItem('mockSevas')) || [
  { id: 1, name: 'Abhishekam', price: 2500, duration: 30, slots: 10 },
  { id: 2, name: 'Archana', price: 500, duration: 15, slots: 20 }
];

let mockDonations = JSON.parse(localStorage.getItem('mockDonations')) || [];

let mockRoomsSetup = JSON.parse(localStorage.getItem('mockRoomsSetup')) || [
  { id: 101, type: 'AC Single', capacity: 1, price: 1500, status: 'Active', facilities: 'AC, TV, WiFi' },
  { id: 102, type: 'AC Double', capacity: 2, price: 2500, status: 'Active', facilities: 'AC, TV, WiFi, Balcony' },
  { id: 201, type: 'Non-AC Single', capacity: 1, price: 800, status: 'Active', facilities: 'Fan, Hot Water' },
  { id: 202, type: 'Non-AC Double', capacity: 2, price: 1400, status: 'Maintenance', facilities: 'Fan' },
  { id: 301, type: 'VIP Suite', capacity: 4, price: 5000, status: 'Active', facilities: 'AC, TV, Fridge, Kitchenette' }
];

let mockRoomsBooking = JSON.parse(localStorage.getItem('mockRoomsBooking')) || [
  { id: 101, type: 'AC Single', price: 1500, status: 'Available', bookedBy: '-', checkIn: '-', checkOut: '-' },
  { id: 102, type: 'AC Double', price: 2500, status: 'Booked', bookedBy: 'Rama Krishna', checkIn: '2024-10-21', checkOut: '2024-10-23' },
  { id: 201, type: 'Non-AC Single', price: 800, status: 'Available', bookedBy: '-', checkIn: '-', checkOut: '-' },
  { id: 202, type: 'Non-AC Double', price: 1400, status: 'Maintenance', bookedBy: '-', checkIn: '-', checkOut: '-' },
  { id: 301, type: 'VIP Suite', price: 5000, status: 'Available', bookedBy: '-', checkIn: '-', checkOut: '-' }
];

// Save to localStorage
const saveMockData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Axios instance with mock interceptor
const api = axios.create({
  baseURL: API_BASE,
});

// Mock response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(error.response?.data?.message || 'Something went wrong!');
    return Promise.reject(error);
  }
);

export const devoteesAPI = {
  getAll: () => mockDelay(() => mockDevotees),
  create: (devotee) => {
    const newDevotee = { id: Date.now(), ...devotee, createdAt: new Date().toISOString().split('T')[0] };
    mockDevotees.unshift(newDevotee);
    saveMockData('mockDevotees', mockDevotees);
    return mockDelay(() => newDevotee);
  }
};

export const sevasAPI = {
  getAll: () => mockDelay(() => mockSevas),
  getSlots: (sevaId) => mockDelay(() => ({ availableSlots: Math.floor(Math.random() * 10) + 1 })),
  book: (bookingData) => {
    const booking = { id: Date.now(), ...bookingData, status: 'confirmed', bookedAt: new Date().toISOString() };
    mockDonations.push({ ...booking, amount: booking.totalAmount || 2500, type: 'Seva Booking' });
    saveMockData('mockDonations', mockDonations);
    return mockDelay(() => booking);
  }
};

export const donationsAPI = {
  getAll: () => mockDelay(() => mockDonations),
  create: (donation) => {
    const newDonation = { id: Date.now(), ...donation, status: 'completed' };
    mockDonations.unshift(newDonation);
    saveMockData('mockDonations', mockDonations);
    return mockDelay(() => newDonation);
  }
};

export const roomsAPI = {
  getSetup: () => mockDelay(() => mockRoomsSetup),
  getBooking: () => mockDelay(() => mockRoomsBooking),
  updateSetup: (updatedRooms) => {
    mockRoomsSetup = updatedRooms;
    saveMockData('mockRoomsSetup', mockRoomsSetup);
    return mockDelay(() => ({ success: true }));
  },
  updateBooking: (updatedRooms) => {
    mockRoomsBooking = updatedRooms;
    saveMockData('mockRoomsBooking', mockRoomsBooking);
    return mockDelay(() => ({ success: true }));
  }
};

export const alertsAPI = {
  getAll: () => mockDelay(() => mockAlerts),
  create: (alertData) => {
    const newAlert = { id: Date.now(), timestamp: new Date().toISOString(), status: 'unread', ...alertData };
    mockAlerts.unshift(newAlert);
    saveMockData('mockAlerts', mockAlerts);
    return mockDelay(() => newAlert);
  },
  updateStatus: (alertId, status) => {
    const alert = mockAlerts.find(a => a.id === alertId);
    if (alert) {
      alert.status = status;
      saveMockData('mockAlerts', mockAlerts);
    }
    return mockDelay(() => ({ success: true }));
  },
  dismiss: (alertId) => {
    mockAlerts = mockAlerts.filter(a => a.id !== alertId);
    saveMockData('mockAlerts', mockAlerts);
    return mockDelay(() => ({ success: true }));
  }
};

// Mock delay helper
const mockDelay = (callback) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(callback()), MOCK_DELAY);
  });
};

export default api;
