
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
        "leading-[32px] text-balance md:leading-[30px] text-black font-semibold",
        className
      )}
    >
      {children}
    </h2>
  );
};
