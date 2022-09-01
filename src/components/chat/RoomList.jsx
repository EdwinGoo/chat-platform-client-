// import React, { useState, useLayoutEffect } from "react";
import styled from "styled-components";
import useSWR from "swr";
import Room from "./Room";
import Loading from "../common/Loading";
import fetcher from "../../utils/fetcher";

const RoomListWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const RoomListHeader = styled.div`
  display: flex;
  align-items: center;
  color: black;
  margin-right: auto;
  font-size: var(--sub-title-font-size);
  color: #000000;
  font-weight: 700;
  margin-bottom: 0.5rem;
  padding: 0.9rem 0 0.9rem 0.8rem;
  width: calc(100%);
  border-radius: 9px;
`;
const RoomListItem = styled.div`
  min-height: 0;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0.9rem;
    color: #629eff;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #c7c7c7;
    border-radius: 7px;
    background-clip: padding-box;
    border: 3px solid transparent;
  }
  ::-webkit-scrollbar-track {
    background-color: #f3f5f9;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`;

function RoomList() {
  // const [rooms, setRooms] = useState([]);
  const { data, error } = useSWR("/mng/rooms", fetcher, {
    refreshInterval: 50000, // wow...
    revalidateOnFocus: true,
  });

  // useLayoutEffect(() => {
  //   setRooms(data);
  // }, [data]);

  // const onToggle = useCallback((id) => {
  //   setRooms((rooms) =>
  //     rooms.map((room) =>
  //       room.id === id
  //         ? { ...room, selected: true }
  //         : { ...room, selected: false }
  //     )
  //   );
  // }, []);

  // if (error) return <div>failed to load</div>;
  return (
    <>
      <RoomListWrapper>
        <RoomListHeader>HELP ME!</RoomListHeader>
        {!data || error ? (
          <Loading />
        ) : (
          <RoomListItem>
            {data.map((room) => (
              <Room
                key={room.id}
                id={room.id}
                roomNm={room.roomNm}
                createDate={room.createDate}
                isClosed={room.isClosed}
                uuid={room.roomUuid}
                // onToggle={onToggle}
                selected={room.selected}
                lastMessage={room.lastMessage}
                lastMessageDate={room.lastMessageDate}
                status={room.status}
              />
            ))}
          </RoomListItem>
        )}
      </RoomListWrapper>
    </>
  );
}

export default RoomList;
