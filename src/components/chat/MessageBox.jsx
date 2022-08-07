import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import useStore from "../../store/useStore";
import { Client } from "@stomp/stompjs";
import MessageSend from "./MessageSend";
import Loading from "../common/Loading";
import TelegramIcon from "@mui/icons-material/Telegram";
import MessageList from "./MessageList";
import palette from "../../assets/palette";
import { instance } from "../../utils/Axios";
import { useUserStore } from "../../store/useUserStore";
const brokerURL = "ws://localhost:18080/chat/ws/websocket"; // ? websocket
const subURL = "/chat/sub/room/";
const pubURL = "/chat/pub/message";

const MessageBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const MessageBoxHeader = styled.div`
  display: flex;
  align-items: center;
  color: black;
  margin-right: auto;
  font-size: var(--sub-title-font-size);
  color: #000000;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background-color: #fefefe;
  padding: 0.9rem 0 0.9rem 0.8rem;
  width: 98%;
  border-radius: 8px;
`;

const MessageBoxMain = styled.div`
  background: #ffffff;
  border-top-left-radius: 5px;
  height: 40vh;
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
    background-color: #ffffff;
  }
`;

const JoinButton = styled.button`
  color: ${palette.blue[6]};
  font-size: 1rem;
  padding: 0.1rem;
  padding-bottom: 0.7rem;
  background: none;
  outline: none;
  border: none;
  background: #ffffff;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  transition: all 0.4s background ease-in;
  &:hover {
    background: ${palette.gray[2]};
  }
  cursor: pointer;
  font-weight: 900;
`;

const client = new Client({
  brokerURL,
  onConnect: () => {
    console.log("is It connected??  : " + client.connected);
  },
  debug: function (str) {
    // console.log(str);
  },
  onDisconnect: () => {
    console.log("disconnect =)");
  },
});

function MessageBox() {
  const { selectedRoom, setSelectedRoom } = useStore();
  const [prvRoom, setPrvRoom] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const scrollRef = useRef();
  const { userInfo } = useUserStore();

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const onMessageConcat = useCallback((rcvMessage) => {
    const newMessage = {
      id: rcvMessage.id,
      message: rcvMessage.message,
      senderId: rcvMessage.senderId,
      type: rcvMessage.type,
    };
    setMessageList((messageList) => messageList.concat(newMessage));
  }, []);

  const changeMessageList = (messageList) => {
    setMessageList(messageList);
    return messageList;
  };

  useEffect(() => {
    scrollToBottom();
    return () => {};
  }, [messageList]);

  const onClickJoinButton = () => {
    if (selectedRoom === "") {
      alert("입장할 채팅방을 선택해주세요.");
    } else {
      instance
        .patch("/mng/room", {
          id: selectedRoom.id,
          status: "ASGMT",
        })
        .then(function (response) {
          setIsJoined(true);
        })
        .catch(function (error) {
          console.log(error);
        });

      // publishHandler("", "ENTER");
      //

      //
      //
    }
  };

  const subscribe = () => {
    if (client && client.connected && selectedRoom !== "") {
      // console.log("function#-subscribe:" + selectedRoom.uuid);
      client.subscribe(
        subURL + selectedRoom.uuid,
        (data) => {
          // const newMessage = JSON.parse(data.body).message;
          // console.log(JSON.parse(data.body));
          onMessageConcat(JSON.parse(data.body));
        },
        { id: selectedRoom.uuid }
      );
    }
  };

  const unsubscribe = () => {
    if (client && client.connected && prvRoom.uuid !== "") {
      // console.log("function#-unsubscribe:" + prvRoom.uuid);
      client.unsubscribe(prvRoom.uuid);
    }
  };

  const publishHandler = (message, type) => {
    if (client != null) {
      if (!client.connected) return;
      client.publish({
        destination: pubURL,
        body: JSON.stringify({
          roomId: selectedRoom.id,
          roomUuid: selectedRoom.uuid,
          type: type, // 타입 정의해서 어딘가에 두고 사용할 것?
          senderId: userInfo.accntId,
          message: message,
          senderNm: userInfo.userNm,
        }),
      });
    }
  };

  useEffect(() => {
    setPrvRoom(selectedRoom);
    setIsJoined(false);
    if (client.connected) {
      unsubscribe();
      subscribe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRoom]);

  useEffect(() => {
    client.activate();
    return () => {
      setSelectedRoom("");
      client.deactivate();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MessageBoxWrapper>
        <MessageBoxHeader>HelpBox</MessageBoxHeader>
        <MessageBoxMain ref={scrollRef}>
          {selectedRoom !== "" ? (
            <MessageList
              uuid={selectedRoom.uuid}
              roomId={selectedRoom.id}
              changeMessageList={changeMessageList}
              messageList={messageList}
            />
          ) : (
            <Loading />
          )}
        </MessageBoxMain>
        {isJoined === true ? (
          <MessageSend sendMessage={publishHandler} />
        ) : (
          <JoinButton onClick={onClickJoinButton}>
            시작하기 <TelegramIcon />
          </JoinButton>
        )}
      </MessageBoxWrapper>
    </>
  );
}

export default MessageBox;
