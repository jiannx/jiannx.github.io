"use client"
import Link from "./Link";
import { useState } from "react";
import { IconCircleCheckFilled } from '@tabler/icons-react';

export default function Copy({ copyTip, copyData, children }: {
  copyTip: string;
  copyData: string;
  children: any;
}) {
  const [isCopied, setIsCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      onClick={() => {
        navigator.clipboard.writeText(copyData)
        setIsCopied(true);
      }}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsCopied(false);
        setIsHovered(false);
      }}
    >
      <div className="relative">
        {isHovered && (
          <div className="absolute top-4 z-10 bg-base-200 px-2 py-1 rounded shadow-lg">
            {copyData}
          </div>
        )}
        {children}
        {isCopied &&
          <div className="absolute bottom-0 right-0 bg-base-100 rounded-full" title={copyData} >
            <IconCircleCheckFilled stroke={1} size={10} color="green" />
          </div>
        }
      </div>
    </Link>
  )
}