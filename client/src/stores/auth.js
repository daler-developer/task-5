import create from "zustand";

const useAuthStore = create((set) => ({
  currentUser: null,
  setCurrentUser(to) {
    set(() => ({ currentUser: to }));
  },
}));

export default useAuthStore;
