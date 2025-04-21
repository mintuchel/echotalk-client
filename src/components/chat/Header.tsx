import React from "react";
import ModelTypeToggle from "./ModelTypeToggle";

interface HeaderProps {
  model: string;
  setModel: (model: string) => void;
}

const Header: React.FC<HeaderProps> = ({ model, setModel }) => {
  return (
    <div className="w-[45vw] h-[6vh] bg-[#0078d4] flex items-center justify-end rounded-t-[10px] text-white">
      <ModelTypeToggle model={model} setModel={setModel} />
    </div>
  );
};

export default Header;