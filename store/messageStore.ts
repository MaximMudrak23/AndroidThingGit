import { create } from 'zustand';

interface MessageStore {
  message: string;
  setMessage: (msg: string) => void;
}

export const useMessageStore = create<MessageStore>((set) => ({
  message: '',
  setMessage: (msg) => set({ message: msg }),
}));
