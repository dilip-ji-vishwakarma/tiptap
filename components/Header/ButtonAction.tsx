import React from "react";
import { Avtar, Comment, FontChanger, HistoryList, Legend, Share } from "../core";

export const ButtonAction = () => {
  return (
    <>
      <div className="lg:block hidden">
        <FontChanger />
      </div>
      <Legend />
      <HistoryList />
      <Comment />
      <Share />
      <Avtar />
    </>
  );
};
