import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type ColumnType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type ColSpan = ColumnType;

export type GridItemProps = {
  children: ReactNode;
  className?: string;
  columnMerge?: ColSpan;
  colMargeTablet?: ColumnType;
  colMargeLaptop?: ColumnType;
  colMargeDesktop?: ColumnType;
};

type GridCols = Record<ColSpan, string>;
type tabletMerge = Record<ColumnType, string>;
type laptotMerge = Record<ColumnType, string>;
type desktoptMerge = Record<ColumnType, string>;

export const GridItem = ({
  children,
  className,
  columnMerge,
  colMargeTablet,
  colMargeLaptop,
  colMargeDesktop,
}: GridItemProps) => {
  const COLS_SPAN: GridCols = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
    5: "col-span-5",
    6: "col-span-6",
    7: "col-span-7",
    8: "col-span-8",
    9: "col-span-9",
    10: "col-span-10",
    11: "col-span-11",
    12: "col-span-12",
  };
  const ITEM_TABLET: tabletMerge = {
    1: "md:col-span-1",
    2: "md:col-span-2",
    3: "md:col-span-3",
    4: "md:col-span-4",
    5: "md:col-span-5",
    6: "md:col-span-6",
    7: "md:col-span-7",
    8: "md:col-span-8",
    9: "md:col-span-9",
    10: "md:col-span-10",
    11: "md:col-span-11",
    12: "md:col-span-12",
  };
  const ITEM_LAPTOP: laptotMerge = {
    1: "lg:col-span-1",
    2: "lg:col-span-2",
    3: "lg:col-span-3",
    4: "lg:col-span-4",
    5: "lg:col-span-5",
    6: "lg:col-span-6",
    7: "lg:col-span-7",
    8: "lg:col-span-8",
    9: "lg:col-span-9",
    10: "lg:col-span-10",
    11: "lg:col-span-11",
    12: "lg:col-span-12",
  };
  const ITEM_DESKTOP: desktoptMerge = {
    1: "xl:col-span-1",
    2: "xl:col-span-2",
    3: "xl:col-span-3",
    4: "xl:col-span-4",
    5: "xl:col-span-5",
    6: "xl:col-span-6",
    7: "xl:col-span-7",
    8: "xl:col-span-8",
    9: "xl:col-span-9",
    10: "xl:col-span-10",
    11: "xl:col-span-11",
    12: "xl:col-span-12",
  };
  return (
    <div
      className={cn(
        "grid-item",
        columnMerge && COLS_SPAN[columnMerge],
        colMargeTablet && ITEM_TABLET[colMargeTablet],
        colMargeLaptop && ITEM_LAPTOP[colMargeLaptop],
        colMargeDesktop && ITEM_DESKTOP[colMargeDesktop],
        className
      )}
    >
      {children}
    </div>
  );
};
