import React, { useState, useEffect } from "react";
import NooraChat from "../interfaces/noora-chat/chat/NooraChat";
import DesktopMenu from "../interfaces/noora-chat/menu/DesktopMenu";
import Summary from "../interfaces/noora-chat/summary/Summary";
import { isIOS } from 'react-device-detect';

const OLD = "old";
const NEW = "new";

// interface ModuleChatProps {
//   modules: any[]; // You can replace 'any' with a specific type that represents the 'modules' property
// }


type ModuleChatProps = {
  focusedMode: boolean;
  modules: any[];
};

export default function ModuleChat(input_modules: ModuleChatProps) {
  let focusedMode = input_modules.focusedMode;
  const [h, setH] = useState([]);
  const active_modules = input_modules.modules.filter((m: any) => m.active);
  let questionType = NEW;
  if (active_modules && ["general", "work"].includes(active_modules[0].title)) {
    questionType = OLD;
  }

  const [cs, setCs] = useState({
    draft: "",
    turn: "user-answer-start",
    modules: input_modules.modules,
    model: {
      name: "text-davinci-002",
      temperature: 0.9,
      frequencyPenalty: 0.6,
      presencePenalty: 0.5,
      goodReplyThreshold: 0.5,
    },
    progress: [],
    audio: {
      player: null,
      messageId: null,
      autoPlaying: false,
      shouldAutoPlay: isIOS ? false : true,
    },
    numProblems: 10,
    questionType: questionType,
    clock: {
      currentTimeSpent: 0,
      prevTimeSpent: 0,
    },
    times: [],
    stt: false,
    researchMode: {
      focused: focusedMode,
    },
    sentiments: [
      { title: "positive", active: true },
      { title: "neutral", active: true },
      { title: "negative", active: true },
    ]
  });

  cs.questionType = questionType;
  const history = {
    value: h,
    setValue: setH,
  };

  const convoState = {
    value: cs,
    setValue: setCs,
  };

  useEffect(() => {
    if (input_modules.modules)
      setCs((c: any) => {
        return { ...c, modules: input_modules.modules };
      });
  }, [input_modules.modules]);

  // console.log("History")
  // console.log(history);

  // console.log("convoState");
  // console.log(convoState.value.times);

  return (
    <div className="bg-gray-100 py-4" id="homeChat">
      <div className="py-4 container flex items-stretch flex-col md:flex-row justify-center md:space-x-2 space-y-2 md:space-y-0">
        <div className="basis-auto md:basis-7/12  lg:basis-3/4 w-full mx-auto">
          {convoState.value.turn == "summary" ? (
            <Summary history={history} convoState={convoState} />
          ) : (
            <NooraChat history={history} convoState={convoState} />
          )}
        </div>
        <div className="basis-auto md:basis-5/12 lg:basis-1/4 w-full mx-auto md:min-h-full">
          <DesktopMenu convoState={convoState} />
        </div>
      </div>
    </div>
  );
}

