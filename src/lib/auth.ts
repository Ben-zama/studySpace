export type User = {
  id: string;
  name: string;
  email: string;
  level?: string;
  gender?: string;
  phoneNumber?: string;
};

// Internal representation including password hash
type StoredUser = User & {
  passwordHash: string;
};

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Simple mock hash function (for demonstration purposes only)
const mockHash = (password: string) => btoa(password).split('').reverse().join('');

export const authService = {
  async register(
    name: string, 
    email: string, 
    password: string, 
    level?: string, 
    gender?: string, 
    phoneNumber?: string
  ): Promise<User> {
    await delay(600); // Simulate network latency

    const usersStr = localStorage.getItem('studySpace_users');
    const users: StoredUser[] = usersStr ? JSON.parse(usersStr) : [];

    if (users.some((u) => u.email === email)) {
      throw new Error('User with this email already exists');
    }

    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      name,
      email,
      level,
      gender,
      phoneNumber,
      passwordHash: mockHash(password),
    };

    users.push(newUser);
    localStorage.setItem('studySpace_users', JSON.stringify(users));

    const { passwordHash, ...userToReturn } = newUser;
    
    // Set current session
    localStorage.setItem('studySpace_session', JSON.stringify(userToReturn));

    return userToReturn;
  },

  async login(email: string, password: string): Promise<User> {
    await delay(600);

    const usersStr = localStorage.getItem('studySpace_users');
    const users: StoredUser[] = usersStr ? JSON.parse(usersStr) : [];

    const user = users.find((u) => u.email === email);

    if (!user || user.passwordHash !== mockHash(password)) {
      throw new Error('Invalid email or password');
    }

    const { passwordHash, ...userToReturn } = user;
    
    // Set current session
    localStorage.setItem('studySpace_session', JSON.stringify(userToReturn));

    return userToReturn;
  },

  async logout(): Promise<void> {
    await delay(200);
    localStorage.removeItem('studySpace_session');
  },

  getCurrentUser(): User | null {
    const sessionStr = localStorage.getItem('studySpace_session');
    if (sessionStr) {
      try {
        return JSON.parse(sessionStr);
      } catch (e) {
        return null;
      }
    }
    return null;
  }
};
