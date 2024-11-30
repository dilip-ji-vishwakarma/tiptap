"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Paragraph } from "../Paragraph";

type TabProps = {
  data: any;
  activetab: string;
};

const templates: any = {
  "paragraph": Paragraph,
};

export const Tab = ({ data, activetab }: TabProps) => {
  const [active, setActive] = useState(activetab);

  useEffect(() => {
    setActive(activetab);
  }, [activetab]);

  return (
    <Tabs value={active} onValueChange={setActive} className="w-full space-y-5">
      <TabsList className="w-full">
        {data.map((item: any, index: any) => (
          <TabsTrigger value={item.name} key={index} className="w-full md:text-xl py-2">
            {item.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {data.map((item: any, index: any) => {
        const CurrentTemplate = templates[item.template];
        return (
          <TabsContent value={item.name} key={index}>
            {CurrentTemplate ? <CurrentTemplate data={item.data} /> : <div>Template not found</div>}
          </TabsContent>
        );
      })}
    </Tabs>
  );
};
