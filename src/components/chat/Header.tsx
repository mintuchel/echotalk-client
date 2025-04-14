import React from "react";
import ModelTypeToggle from "./ModelTypeToggle";

interface HeaderProps {
  model: string;
  setModel: (model: string) => void;
}

const Header: React.FC<HeaderProps> = ({ model, setModel }) => {
  return (
    <div
      style={{
        width: "800px",
        height: "60px",
        backgroundColor: "#0078d4",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        borderRadius: "10px 10px 0 0",
        color: "white",
        fontSize: "1.5rem",
        fontWeight: "bold",
      }}
    >
      EchoTalk
      <ModelTypeToggle model={model} setModel={setModel} />
    </div>
  );
};

export default Header;