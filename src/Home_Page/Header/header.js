import React from "react";

export default function Header() {
  const listStyle = { listStyle: "none", margin: "0 60px" };

  const anchorStyle = {
    textTransform: "capitalize",
    textDecoration: "none",
    color: "white",
  };
  return (
    <header
      style={{
        position: "absolute",
        zIndex: 99,
        width: "100%",
        padding: "60px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontWeight: 900, letterSpacing: "2px", color: "#fff" }}>
          CrySim.
        </div>
        <nav>
          <ul
            style={{
              margin: 0,
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
           
            <li style={listStyle}>
              <a style={{...anchorStyle, textDecoration: "underline"}} href="/Help">
                Online Help
              </a>
            </li>
            <li
              style={{
                color: "#fff",
                fontWeight: 600,
                background: "#23232a",
                padding: "16px 24px",
                borderRadius: "10px",
                ...listStyle,
              }}
            >
              <a style={anchorStyle} href="/Login">
                Login
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
