// import React, { useState, useLayoutEffect } from "react";
import styled from "styled-components";
import useSWR from "swr";
import Room from "./Room";
import Loading from "../common/Loading";
import fetcher from "../../utils/fetcher";
import SubTitle from "../common/SubTitle";

const RoomListWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
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
  const { data, error } = useSWR("/mng/rooms", fetcher, {
    refreshInterval: 50000, // wow...
    revalidateOnFocus: true,
  });

  return (
    <>
      <RoomListWrapper>
        <SubTitle>HELP ME!</SubTitle>
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
