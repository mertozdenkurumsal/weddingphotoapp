export type User = {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
};

class InMemoryUserStore {
  private usersByEmail: Map<string, User> = new Map();
  private usersById: Map<string, User> = new Map();

  createUser = (user: Omit<User, 'createdAt' | 'updatedAt'>): User => {
    const now = new Date().toISOString();
    const newUser: User = { ...user, createdAt: now, updatedAt: now };
    this.usersByEmail.set(newUser.email.toLowerCase(), newUser);
    this.usersById.set(newUser.id, newUser);
    return newUser;
  };

  getByEmail = (email: string): User | undefined => {
    return this.usersByEmail.get(email.toLowerCase());
  };

  getById = (id: string): User | undefined => {
    return this.usersById.get(id);
  };
}

export const userStore = new InMemoryUserStore();
