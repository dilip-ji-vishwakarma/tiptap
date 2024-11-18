import React, { ReactNode } from "react";
import { GridItem } from "./GridItem";
import { cn } from "@/lib/utils";
type ColumnType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type GridGapType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type GridBoxProps = {
  children: ReactNode;
  className?: string;
  columns?: ColumnType;
  rows?: string;
  gap?: GridGapType;
  mobile?: ColumnType;
  tablet?: ColumnType;
  laptop?: ColumnType;
  desktop?: ColumnType;
};

type GridGAP = Record<GridGapType, string>;
type GridCols = Record<ColumnType, string>;
type GridM = Record<ColumnType, string>;
type GridT = Record<ColumnType, string>;
type GridL = Record<ColumnType, string>;
type GridD = Record<ColumnType, string>;

export const GridBox = ({
  children,
  className,
  columns,
  rows,
  gap = 1,
  mobile,
  tablet,
  laptop,
  desktop,
}: GridBoxProps) => {
  const GRID_GAP: GridGAP = {
    0: "gap-0",
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    5: "gap-5",
    6: "gap-6",
    7: "gap-7",
    8: "gap-8",
    9: "gap-9",
    10: "gap-10",
  };

  const GRID_COLS: GridCols = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    7: "grid-cols-7",
    8: "grid-cols-8",
    9: "grid-cols-9",
    10: "grid-cols-10",
    11: "grid-cols-11",
    12: "grid-cols-12",
  };
  const GRID_MOBILE: GridM = {
    1: "sm:grid-cols-1",
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-3",
    4: "sm:grid-cols-4",
    5: "sm:grid-cols-5",
    6: "sm:grid-cols-6",
    7: "sm:grid-cols-7",
    8: "sm:grid-cols-8",
    9: "sm:grid-cols-9",
    10: "sm:grid-cols-10",
    11: "sm:grid-cols-11",
    12: "sm:grid-cols-12",
  };
  const GRID_TABLET: GridT = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
    5: "md:grid-cols-5",
    6: "md:grid-cols-6",
    7: "md:grid-cols-7",
    8: "md:grid-cols-8",
    9: "md:grid-cols-9",
    10: "md:grid-cols-10",
    11: "md:grid-cols-11",
    12: "md:grid-cols-12",
  };
  const GRID_LAPTOP: GridL = {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
    5: "lg:grid-cols-5",
    6: "lg:grid-cols-6",
    7: "lg:grid-cols-7",
    8: "lg:grid-cols-8",
    9: "lg:grid-cols-9",
    10: "lg:grid-cols-10",
    11: "lg:grid-cols-11",
    12: "lg:grid-cols-12",
  };
  const GRID_DESKTOP: GridD = {
    1: "xl:grid-cols-1",
    2: "xl:grid-cols-2",
    3: "xl:grid-cols-3",
    4: "xl:grid-cols-4",
    5: "xl:grid-cols-5",
    6: "xl:grid-cols-6",
    7: "xl:grid-cols-7",
    8: "xl:grid-cols-8",
    9: "xl:grid-cols-9",
    10: "xl:grid-cols-10",
    11: "xl:grid-cols-11",
    12: "xl:grid-cols-12",
  };

  return (
    <div
      className={cn(
        "sm:grid",
        columns && GRID_COLS[columns],
        rows && ` grid-rows-${rows}`,
        GRID_GAP[gap],
        mobile && GRID_MOBILE[mobile],
        tablet && GRID_TABLET[tablet],
        laptop && GRID_LAPTOP[laptop],
        desktop && GRID_DESKTOP[desktop],
        className
      )}
    >
      {children}
    </div>
  );
};

GridBox.GridItem = GridItem;
