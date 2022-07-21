import React, { useContext } from "react";
import { PlaygroundContext } from "../Playground";
import NooraChat from "./NooraChat";
import Progress from "./Progress";

export default function Practice() {
  const { practice } = useContext(PlaygroundContext);
  const { draft, history, convoState } = practice;

  return (
    <div className="bg-gray-100 pt-14">
      <div className="py-4 container flex items-stretch flex-col md:flex-row justify-center md:space-x-2 space-y-2 md:space-y-0">
        <div className="basis-auto md:basis-3/4 lg:basis-3/4 w-full mx-auto">
          <NooraChat draft={draft} history={history} convoState={convoState} />
        </div>
        <div className="basis-auto md:basis-1/4 lg:basis-1/4 w-full mx-auto md:min-h-full">
          <Progress />
        </div>
      </div>
    </div>
  );
}
