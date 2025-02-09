"use client";

import React, { useState } from "react";

const LevelMark = () => {
  const [exec, setExec] = useState(true);
  const [hoverIndex, setHoverIndex] = useState<null | number>(null);


  const handleMouseEnter = (index: number) => {
    if(exec) setHoverIndex(index);
  };
  const handleMouseLeave = () => {
    if(exec) setHoverIndex(null);
  };
  const handleClick = () => {
    setExec(!exec);
  };

  return (
    <div className="LevelMark">
      <p>しない</p>
      <div className="boxes">
        {[...Array(5)].map((_, index) => {
          return (
            <div
              className={`box ${
                hoverIndex !== null && index <= hoverIndex ? "isActive" : ""
              }`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
            ></div>
          );
        })}
      </div>
      <p>した</p>
    </div>
  );
};

export default LevelMark;
