import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiSave, FiEdit2, FiTrash2 } from 'react-icons/fi';

const RolePermissions = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', permissions: { seva: true, donation: true, billing: true, reports: true, inventory: true } },
    { id: 2, name: 'Staff', permissions: { seva: true, donation: false, billing: true, reports: false, inventory: false } },
    { id: 3, name: 'Accountant', permissions: { seva: false, donation: true, billing: true, reports: true, inventory: false } }
  ]);
  const [editingRole, setEditingRole] = useState(null);

  const modules = [
    { key: 'seva', label: 'Seva Management' },
    { key: 'donation', label: 'Donation Management' },
    { key: 'billing', label: 'Billing System' },
    { key: 'reports', label: 'Reports & MIS' },
    { key: 'inventory', label: 'Inventory Management' }
  ];

  const permissions = ['create', 'edit', 'delete', 'view'];

  const onSubmit = (data) => {
    if (editingRole) {
      setRoles(roles.map(role => 
        role.id === editingRole.id 
          ? { ...role, name: data.roleName, permissions: data.permissions }
          : role
      ));
      toast.success('Role updated successfully!');
    } else {
      const newRole = {
        id: roles.length + 1,
        name: data.roleName,
        permissions: data.permissions
      };
      setRoles([...roles, newRole]);
      toast.success('Role created successfully!');
    }
    setEditingRole(null);
    reset();
  };

  const handleEdit = (role) => {
    setEditingRole(role);
    setValue('roleName', role.name);
    setValue('permissions', role.permissions);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(role => role.id !== id));
      toast.success('Role deleted successfully!');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Add/Edit Role Form */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b bg-gradient-to-r from-orange-50 to-white">
          <h1 className="text-2xl font-bold text-gray-800">
            {editingRole ? 'Edit Role' : 'Create New Role'}
          </h1>
          <p className="text-gray-600 mt-1">Define role-based access permissions for system modules</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('roleName', { required: 'Role name is required' })}
              className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter role name (e.g., Supervisor, Cashier)"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Module Access Permissions
            </label>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Module</th>
                    {permissions.map(perm => (
                      <th key={perm} className="px-4 py-3 text-center text-sm font-medium text-gray-700 capitalize">
                        {perm}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {modules.map(module => (
                    <tr key={module.key}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{module.label}</td>
                      {permissions.map(perm => (
                        <td key={`${module.key}-${perm}`} className="px-4 py-3 text-center">
                          <input
                            type="checkbox"
                            {...register(`permissions.${module.key}.${perm}`)}
                            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            {editingRole && (
              <button
                type="button"
                onClick={() => {
                  setEditingRole(null);
                  reset();
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition flex items-center"
            >
              <FiSave className="mr-2" />
              {editingRole ? 'Update Role' : 'Create Role'}
            </button>
          </div>
        </form>
      </div>

      {/* Roles List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Existing Roles</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {roles.map(role => (
            <div key={role.id} className="p-6 hover:bg-gray-50">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{role.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">Role ID: ROL{String(role.id).padStart(3, '0')}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(role)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  >
                    <FiEdit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(role.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {modules.map(module => (
                  <div key={module.key} className="text-sm">
                    <span className="font-medium text-gray-700">{module.label}:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {permissions.map(perm => (
                        role.permissions[module.key]?.[perm] && (
                          <span key={perm} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full capitalize">
                            {perm}
                          </span>
                        )
                      ))}
                      {!Object.values(role.permissions[module.key] || {}).some(v => v) && (
                        <span className="text-gray-400 text-xs">No access</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RolePermissions;