import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Footer({ convoState, summary, history, draft }: any) {
  return (
    <div className="bg-gray-100 border-2 border-gray-400 rounded-b-lg py-4 text-center">
      <button
        onClick={() => {
          // reset
          draft.setValue("");
          history.setValue([]);
          summary.setValue({ show: false });
          convoState.setValue({
            turn: "user-answer",
            modules: [
              { title: "general", active: true },
              { title: "work", active: true },
            ],
            progress: [],
            numProblems: 10,
          });
        }}
        className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium rounded-full text-white bg-noora-secondary-light hover:bg-noora-secondary-main"
      >
        Try Again
        <FontAwesomeIcon icon={faRepeat} className="ml-2 h-4 w-4" />
      </button>
    </div>
  );
}
