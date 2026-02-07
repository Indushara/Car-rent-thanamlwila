const ADMIN_STORAGE_KEY = 'admin_auth';
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123', // In production, use proper authentication
};

export function loginAdmin(username: string, password: string): boolean {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(ADMIN_STORAGE_KEY, 'true');
    }
    return true;
  }
  return false;
}

export function logoutAdmin(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
  }
}

export function isAdminLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(ADMIN_STORAGE_KEY) === 'true';
}
