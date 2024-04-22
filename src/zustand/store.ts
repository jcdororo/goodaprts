import { create } from "zustand";
import { User } from "../types/user";

interface UserDataStore {
  user: User | {};
  setUser: (userInfo: User) => void;
}

export const userData = create<UserDataStore>((set) => ({
  user: {},
  setUser: (userInfo: User) => set({ user: userInfo }),
}));
