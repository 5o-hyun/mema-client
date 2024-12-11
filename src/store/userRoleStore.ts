import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserRole = 'ROLE_CUSTOM' | 'ROLE_NAVER';

interface UserRoleState {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

export const useUserRoleStore = create(
  persist<UserRoleState>(
    (set) => ({
      userRole: 'ROLE_NAVER',
      setUserRole: (role) => set({ userRole: role }),
    }),
    { name: 'useRole' },
  ),
);
