import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AlertMessage from '../../components/Common/AlertMessage';

const BackupRestore = () => {
  const [backupLoading, setBackupLoading] = useState(false);
  const [restoreLoading, setRestoreLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleBackup = async () => {
    setBackupLoading(true);
    // Mock backup
    await new Promise(resolve => setTimeout(resolve, 2000));
    setMessage('Backup created successfully: backup-2024-10-20.json');
    setBackupLoading(false);
  };

  const handleRestore = async () => {
    setRestoreLoading(true);
    // Mock restore
    await new Promise(resolve => setTimeout(resolve, 2000));
    setMessage('Restore completed successfully from backup-2024-10-20.json');
    setRestoreLoading(false);
  };

  return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Backup & Restore</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold mb-4">Create Backup</h2>
            <button
              onClick={handleBackup}
              disabled={backupLoading}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {backupLoading ? 'Creating...' : 'Create Backup'}
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold mb-4">Restore Backup</h2>
            <button
              onClick={handleRestore}
              disabled={restoreLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {restoreLoading ? 'Restoring...' : 'Restore from File'}
            </button>
          </div>
        </div>
        {message && (
          <AlertMessage type="success" message={message} onClose={() => setMessage('')} />
        )}
      </div>
  );
};

export default BackupRestore;
