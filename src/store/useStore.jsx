import create from "zustand";

const useStore = create((set) => ({
  // 여기에는 채팅 가능 상태를 헤더 쪽에서 지정할 수 있게 ? on/off 버튼으로 구현할 상태 추가
  selectedRoom: "",
  setSelectedRoom: (room) => set({ selectedRoom: room }),
}));
export default useStore;
