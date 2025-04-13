import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ModelTypeToggleProps {
  model: string;
  setModel: (lang: string) => void;
}

const ModelTypeToggle: React.FC<ModelTypeToggleProps> = ({
  model,
  setModel,
}) => {
  return (
    <div className="flex items-center mr-6">
      <label className="mr-2 text-base font-semibold border border-white px-2 py-1 rounded">
        LLM Model
      </label>
      <Select value={model} onValueChange={setModel}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="openai">openai</SelectItem>
          <SelectItem value="exa">exaone</SelectItem>
          <SelectItem value="g3">gemma3</SelectItem>
          <SelectItem value="ds">deepseek-r1</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ModelTypeToggle;
