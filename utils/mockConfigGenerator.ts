import { User } from '@/types/user';

export function generateMockConfig(users: User[]) {
  return {
    'GET /api/users': (_req: any, res: any) => {
      res.json(users);
    },
    'GET /api/user/:id': (req: any, res: any) => {
      const id = parseInt(req.params.id);
      const user = users.find(u => u.id === id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    },
    'POST /api/user': (req: any, res: any) => {
      const newUser: User = {
        ...req.body,
        id: Math.max(0, ...users.map(u => u.id)) + 1,
        createdAt: new Date().toISOString()
      };
      users.push(newUser);
      res.status(201).json(newUser);
    },
    'PUT /api/user/:id': (req: any, res: any) => {
      const id = parseInt(req.params.id);
      const userIndex = users.findIndex(u => u.id === id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...req.body };
        res.json(users[userIndex]);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    },
    'DELETE /api/user/:id': (req: any, res: any) => {
      const id = parseInt(req.params.id);
      const userIndex = users.findIndex(u => u.id === id);
      if (userIndex !== -1) {
        const deletedUser = users.splice(userIndex, 1)[0];
        res.json(deletedUser);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    }
  };
}

