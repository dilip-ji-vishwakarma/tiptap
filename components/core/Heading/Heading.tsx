
import classNames from "classnames";
import React, { ReactNode } from "react";

export const Heading = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h2
      className={classNames(
        "text-[20px] leading-[32px] text-balance md:text-[25px] md:leading-[30px] text-black font-semibold",
        className
      )}
    >
      {children}
    </h2>
  );
};
