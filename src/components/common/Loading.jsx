import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

function Loading() {
  return (
    <div className="contentWrap">
      <div
        style={{
          position: "relative",
        }}
      >
        <BeatLoader size={8} color="#5b9fe6" />
      </div>
    </div>
  );
}

export default Loading;
