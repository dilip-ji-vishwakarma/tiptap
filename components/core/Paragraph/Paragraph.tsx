
import classNames from "classnames";
import React from "react";

export const Paragraph = ({
  data,
  className,
}: {
  data: string;
  className?: string;
}) => {
  return (
    <div
      className={classNames(
        "text-balance text-[18px] leading-[36px] md:text-[18px] md:leading-[36px] font-[400] text-black tracking-[_0.4px] !whitespace-normal",
        className
      )}
    >
      {data}
    </div>
  );
};
