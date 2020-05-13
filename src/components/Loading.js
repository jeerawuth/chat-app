import React from "react";

export default function Loading({ style }) {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        position: "absolute",
        bottom: "30%",
        left: "33%",
        right: "33%",
        ...style,
      }}
    >
      <div className="spinner-grow text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-grow text-secondary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-grow text-success" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
