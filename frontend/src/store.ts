import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface MenuStore {
  open: boolean;
  setOpen: (o: boolean) => void;
}

export const useMenuStore = create<MenuStore>()(
  immer((set) => ({
    open: false,
    setOpen: (o) =>
      set((state) => {
        state.open = o;
      }),
  }))
);
