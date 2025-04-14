import React from "react";
import ModelTypeToggle from "./ModelTypeToggle";

interface HeaderProps {
  model: string;
  setModel: (model: string) => void;
}

const Header: React.FC<HeaderProps> = ({ model, setModel }) => {
  return (
    <div className="w-[45vw] h-[6vh] bg-[#0078d4] flex items-center justify-between px-5 rounded-t-[10px] text-white text-[1.5rem] font-bold">
      EchoTalk
      <ModelTypeToggle model={model} setModel={setModel} />
    </div>
  );
};

export default Header;