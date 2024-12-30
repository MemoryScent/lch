import React, { useState } from 'react';
import { generateMockConfig } from '@/utils/mockConfigGenerator';
import { User } from '@/types/user';

const MockConfigGenerator: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ]);

  const [mockConfig, setMockConfig] = useState<string>('');
  const [newUser, setNewUser] = useState<Omit<User, 'id'>>({ name: '', email: '' });

  const handleGenerateConfig = () => {
    const config = generateMockConfig(users);
    setMockConfig(JSON.stringify(config, null, 2));
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([...users, { ...newUser, id: Math.max(...users.map(u => u.id)) + 1 }]);
      setNewUser({ name: '', email: '' });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mock Config Generator</h1>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Add New User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="border p-2 mr-2"
        />
        <button 
          onClick={handleAddUser}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add User
        </button>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">User List</h2>
        <ul>
          {users.map(user => (
            <li key={user.id} className="mb-1">
              {user.name} ({user.email})
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
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Generated Mock Config</h2>
          <pre className="p-4 bg-gray-100 rounded overflow-auto">
            {mockConfig}
          </pre>
        </div>
      )}
    </div>
  );
};

export default MockConfigGenerator;

