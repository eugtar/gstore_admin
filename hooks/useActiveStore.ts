import { create } from "zustand";

interface IUseActiveStore {
  id?: string;
  set: (id: string) => void;
  reset: () => void;
}

const useActiveStore = create<IUseActiveStore>((set) => {
  return {
    id: undefined,
    set(id: string) {
      set({ id });
    },
    reset() {
      set({ id: undefined });
    },
  };
});

export default useActiveStore;
