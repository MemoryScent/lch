"use client"

import React, { useState, useCallback } from 'react';
import { generateMockConfig } from '@/utils/mockConfigGenerator';
import { User } from '@/types/user';
import { useUsers } from '@/hooks/useUsers';
import { UserForm } from '@/components/UserForm';

const initialUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', createdAt: '2023-01-01T00:00:00Z' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', createdAt: '2023-01-02T00:00:00Z' },
];

const MockConfigGenerator: React.FC = () => {
  const { users, addUser, updateUser, deleteUser } = useUsers(initialUsers);
  const [mockConfig, setMockConfig] = useState<string>('');

  const handleGenerateConfig = useCallback(() => {
    const config = generateMockConfig(users);
    setMockConfig(JSON.stringify(config, null, 2));
  }, [users]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mock Config Generator</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add New User</h2>
        <UserForm onSubmit={addUser} />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">User List</h2>
        <ul className="space-y-4">
          {users.map(user => (
            <li key={user.id} className="bg-white shadow rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">{user.name}</h3>
                  <p className="text-gray-500">{user.email}</p>
                  <p className="text-sm text-gray-400">Role: {user.role}</p>
                  <p className="text-sm text-gray-400">Created: {new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
                <button 
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <button 
        onClick={handleGenerateConfig}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Generate Mock Config
      </button>
      
      {mockConfig && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Generated Mock Config</h2>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
            {mockConfig}
          </pre>
        </div>
      )}
    </div>
  );
};

export default MockConfigGenerator;

