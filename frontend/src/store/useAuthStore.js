import { create } from 'zustand';

const useAuthStore = create((set) => ({
    user: null, // could be user or foodPartner
    userType: null, // 'user' or 'partner'
    isAuthenticated: false,
    
    login: (userData, type) => set({ 
        user: userData, 
        userType: type, 
        isAuthenticated: true 
    }),
    
    logout: () => set({ 
        user: null, 
        userType: null, 
        isAuthenticated: false 
    }),
}));

export default useAuthStore;
