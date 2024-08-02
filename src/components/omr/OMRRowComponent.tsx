"use client";

import { cn } from "@/lib/utils";
import React, { Dispatch, SetStateAction } from "react";

interface OMRRowComponentBetaProps {
  val: string;
  valChange: (val: string) => void;
  mutable?: boolean;
}

const OMRRowComponent = () => {
  return (
    <div className="flex flex-col space-y-2 items-center justify-center">
      <div className="h-9 w-6 border-rose-400 border-[2px]">
        <h1> </h1>
      </div>
      <div className="h-6 w-6 rounded-full border-rose-400 border-[2px] flex items-center justify-center">
        <h1 className="text-xs">0</h1>
      </div>
      <div className="h-6 w-6 rounded-full border-rose-400 border-[2px] flex items-center justify-center">
        <h1 className="text-xs">1</h1>
      </div>
      <div className="h-6 w-6 rounded-full border-rose-400 border-[2px] flex items-center justify-center">
        <h1 className="text-xs">2</h1>
      </div>
      <div className="h-6 w-6 rounded-full border-rose-400 border-[2px] flex items-center justify-center">
        <h1 className="text-xs">3</h1>
      </div>
      <div className="h-6 w-6 rounded-full border-rose-400 border-[2px] flex items-center justify-center">
        <h1 className="text-xs">4</h1>
      </div>
      <div className="h-6 w-6 rounded-full border-rose-400 border-[2px] flex items-center justify-center">
        <h1 className="text-xs">5</h1>
      </div>
      <div className="h-6 w-6 rounded-full border-rose-400 border-[2px] flex items-center justify-center">
        <h1 className="text-xs">6</h1>
      </div>
      <div className="h-6 w-6 rounded-full border-rose-400 border-[2px] flex items-center justify-center">
        <h1 className="text-xs">7</h1>
      </div>
      <div className="h-6 w-6 rounded-full border-rose-400 border-[2px] flex items-center justify-center">
        <h1 className="text-xs">8</h1>
      </div>
      <div className="h-6 w-6 rounded-full border-rose-400 border-[2px] flex items-center justify-center">
        <h1 className="text-xs">9</h1>
      </div>
    </div>
  );
};

export const OMRRowComponentAlpha = () => {
  return (
    <div className="flex flex-col space-y-2 items-center">
      <div className="h-9 w-6 border-rose-400 border-[2px]">
        <h1> </h1>
      </div>
      <div className="h-6 w-6 rounded-full border-rose-400 border-[2px] flex items-center justify-center">
        <h1 className="text-xs">A</h1>
      </div>
      <div className="h-6 w-6 rounded-full border-rose-400 border-[2px] flex items-center justify-center">
        <h1 className="text-xs">B</h1>
      </div>
      <div className="h-6 w-6 rounded-full border-rose-400 border-[2px] flex items-center justify-center ">
        <h1 className="text-xs">C</h1>
      </div>
      <div className="h-6 w-6 rounded-full border-rose-400 border-[2px] flex items-center justify-center">
        <h1 className="text-xs">D</h1>
      </div>
    </div>
  );
};

export const OMRRowComponentBeta: React.FC<OMRRowComponentBetaProps> = ({
  val,
  valChange,
  mutable,
}) => {
  const [value, setValue] = React.useState(val || "0");

  const handleClick = (ans: string) => {
    if (value == ans) {
      if (mutable) {
        setValue("0");
        valChange("0");
      }
      return;
    }

    if (mutable) {
      setValue(ans);
      valChange(ans);
    }
    return;
  };
  return (
    <div className="flex space-x-2 items-center">
      {/* <div className="h-9 w-6 border-rose-400 border-[2px]">
        <h1> </h1>
      </div> */}
      <div
        className={cn(
          "h-6 w-6 rounded-full border-rose-400 border-[2px] flex items-center justify-center cursor-pointer",
          value == "A" ? "bg-black text-black border-black" : ""
        )}
        onClick={() => handleClick("A")}
        id="A"
      >
        <h1 className="text-xs">A</h1>
      </div>
      <div
        className={cn(
          "h-6 w-6 rounded-full border-rose-400 border-[2px] flex items-center justify-center cursor-pointer",
          value == "B" ? "bg-black text-black border-black" : ""
        )}
        onClick={() => handleClick("B")}
        id="B"
      >
        <h1 className="text-xs">B</h1>
      </div>
      <div
        className={cn(
          "h-6 w-6 rounded-full border-rose-400 border-[2px] flex items-center justify-center cursor-pointer",
          value == "C" ? "bg-black text-black border-black" : ""
        )}
        onClick={() => handleClick("C")}
        id="C"
      >
        <h1 className="text-xs">C</h1>
      </div>
      <div
        className={cn(
          "h-6 w-6 rounded-full border-rose-400 border-[2px] flex items-center justify-center cursor-pointer",
          value == "D" ? "bg-black text-black border-black" : ""
        )}
        onClick={() => handleClick("D")}
        id="D"
      >
        <h1 className="text-xs">D</h1>
      </div>
    </div>
  );
};

export default OMRRowComponent;
