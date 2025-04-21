import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, FileText, Building2, Workflow, FileSearch } from "lucide-react";

interface ModelTypeToggleProps {
  model: string;
  setModel: (lang: string) => void;
}

// 메뉴 아이템 정의
const menuItems = [
  { label: "직원정보", icon: Users },
  { label: "규정정보", icon: FileText },
  { label: "회사정보", icon: Building2 },
  { label: "RPA현황", icon: Workflow },
  { label: "문서조회", icon: FileSearch },
];

const ModelTypeToggle: React.FC<ModelTypeToggleProps> = ({
  model,
  setModel,
}) => {
  return (
    <div className="flex items-center mr-2">
      <label className="mr-2 text-base font-semibold border border-white px-2 py-1 rounded">
        리소스 메뉴
      </label>
      <Select value={model} onValueChange={setModel}>
        <SelectTrigger className="w-[8vw] bg-white text-black">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <SelectItem key={item.label} value={item.label}>
                <span className="flex items-center">
                  <Icon className="w-4 h-4 mr-2 text-gray-500" />
                  {item.label}
                </span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ModelTypeToggle;
