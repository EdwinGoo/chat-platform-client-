import React, { useEffect, useState } from "react";
import Container from "./Container";
import { Client } from "@stomp/stompjs";

const brokerURL = "ws://localhost:18080/ws/websocket"; // ? websocket
const subURL = "/sub/chat/room/";
const pubURL = "/pub/chat/message";
var client;

export default function SampleChatPage() {
  const [content, setContent] = useState("");

  const connect = () => {
    client = new Client({
      brokerURL,
      onConnect: () => {
        subscribe();
      },
      debug: function (str) {
        console.log(str);
      },
    });
    client.activate();
  };

  const subscribe = () => {
    if (client != null && client.connected) {
      client.subscribe(
        subURL + `04070e92-827e-4644-b325-4c9ee6be9f0d`,
        (data) => {
          console.log(data);
          const newMessage = JSON.parse(data.body).message;
          addContent(newMessage);
        }
      );
    }
  };

  useEffect(() => {
    connect();
    return () => disConnect();
  }, []);

  const addContent = (message) => {
    console.log(message);
    setContent(message);
  };

  const handler = (message) => {
    if (client != null) {
      if (!client.connected) return;

      client.publish({
        destination: pubURL,
        body: JSON.stringify({
          room: {
            roomUuid: "04070e92-827e-4644-b325-4c9ee6be9f0d",
          },
          message: message,
        }),
      });
    }
  };

  const disConnect = () => {
    if (client != null) {
      console.log("tewet");
      if (client.connected) {
        client.disConnect();
      }
    }
  };

  return (
    <>
      <div id="menu">
        <p>Welcome,</p>
      </div>
      <div>{content}</div>
      <Container sendMessage={handler} />
    </>
  );
}
