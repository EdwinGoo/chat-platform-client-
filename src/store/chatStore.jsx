import create from "zustand";

const useChatStore = create((set) => ({
  // 여기에는 채팅 가능 상태를 헤더 쪽에서 지정할 수 있게 ? on/off 버튼으로 구현할 상태 추가
  connectedRoomUUID: "",
  setConnectedRoomUUID: (UUID) => set({ connectedRoomUUID: UUID }),
}));
export default useChatStore;
