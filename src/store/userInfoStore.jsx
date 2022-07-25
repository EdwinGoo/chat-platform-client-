import create from "zustand";

const useUserInfoStore = create((set) => ({
  //   : 0,
  //   increaseCount: () => set((state) => ({ : state. + 1 })),
  //   setThree: (input) => set({ count: input }),
  accntId: "aet",
  userNm: "",
  setAccntId: (accntid) => set({ accntId: accntid }),
  setUserNm: (userNm) => set({ userNm }),
}));
export default useUserInfoStore;
