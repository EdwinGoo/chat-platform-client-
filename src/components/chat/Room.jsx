import React from "react";
import styled from "styled-components";
import SqureTextBox from "../common/SqureTextBox";
import { timeForToday } from "../../utils/timeUtil";
import useStore from "../../store/useStore";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

// const RoomUserImage = styled.div`
//   color: #cdcdcd;
//   margin: 3px 0.8rem 0rem 0.5rem;
//   margin-right: auto;
// `;

const RoomWrapper = styled.div.attrs((props) => props)`
  cursor: pointer;
  min-height: 4.2rem;
  margin-bottom: 0.4rem;
  background :${(props) => {
    if (props.selected === true) {
      return " #EEEEEE";
    } else {
      return " #fefefe";
    }
  }}};
  flex: 1;
  border-radius: 10px;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10px;
  padding-right: 10px

`;

const RoomNm = styled.div`
  font-size: 1rem;
  font-weight: 500;
  flex-basis: 50%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
  color: black;
  span {
    font-size: 1rem;
    font-weight: 500;
  }
`;
const RoomTime = styled.div`
  margin-left: auto;
  flex-basis: 15%;
  text-align: right;
`;

const RoomStatus = styled.div.attrs((props) => props)`
width: 4rem;
flex-basis: 14%;
font-size: 0.9rem;
height: 1.42rem;
line-height: 1.42rem;
margin: 0 0.7rem 0 0.8rem;
border-radius: 5px;
background: ${(props) => {
  if (props.status === "OPEN") {
    return "#29C840";
  } else if (props.status === "CLOSED") {
    return "#FF5F57";
  } else {
    return "#087BED";
  }
}}};
font-weight: 700;
text-align: center;
color: #ffffff;
//FEBC2D waiting
//29C840 serving
//FF5F57 closed 
`;

const RoomLastMessage = styled.div`
  font-size: 0.85rem;
  color: #626262;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-line-clamp: 1; /* 라인수 */
  -webkit-box-orient: vertical;
  width: 20vw; // 아예 못찾아서 vw로 ..
`;

function Room(props) {
  const { setSelectedRoom, selectedRoom } = useStore();

  const onRoomClick = () => {
    setSelectedRoom(props);
    // props.onToggle(props.id);
  };

  return (
    <>
      <RoomWrapper
        onClick={() => onRoomClick()}
        selected={props.id === selectedRoom.id ? true : false}
      >
        {props.selected}
        <SqureTextBox
          boxSizeWidth="1.5rem"
          text={props.id.toString().slice(-2)}
        />
        <RoomStatus status={props.status}>{props.status}</RoomStatus>
        <RoomNm>
          {props.roomNm} <br />
          <RoomLastMessage>{props.lastMessage} </RoomLastMessage>
        </RoomNm>
        <RoomTime>
          {timeForToday(props.lastMessageDate)} <br />
        </RoomTime>
      </RoomWrapper>
    </>
  );
}

export default React.memo(Room);
