import React from "react";

export const Headline = () => {
  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <img alt="logo" src="/logo.png" height={40} width={40} />
      <div style={{ marginLeft: 15 }}>
        <span style={{ fontWeight: "bold", fontSize: 22 }}>
          Github Searcher
        </span>
        <br />
        <span style={{ fontWeight: 400, color: "gray" }}>
          Search users or repositories below
        </span>
      </div>
    </div>
  );
};
