import { useState, useCallback } from 'react';
import { User } from '@/types/user';

export function useUsers(initialUsers: User[]) {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const addUser = useCallback((user: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...user,
      id: Math.max(0, ...users.map(u => u.id)) + 1,
      createdAt: new Date().toISOString()
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
  }, [users]);

  const updateUser = useCallback((id: number, updates: Partial<User>) => {
    setUsers(prevUsers => prevUsers.map(user => 
      user.id === id ? { ...user, ...updates } : user
    ));
  }, []);

  const deleteUser = useCallback((id: number) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
  }, []);

  return { users, addUser, updateUser, deleteUser };
}

