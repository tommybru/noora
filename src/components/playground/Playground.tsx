import React, {
  Fragment,
  createContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import AskNooraPlayground from "./ask-noora/AskNooraPlayground";
import { Tab } from "@headlessui/react";
import { clsx } from "clsx";
import Practice from "./practice/Practice";
import { useRouter } from "next/router";

export default function Playground() {
  const router = useRouter();

  const [selectedIndex, setSelectedIndex] = useState(
    router.query.page == "ask-noora" ? 1 : 0
  ); // tabs and routing

  useEffect(() => {
    const page: any =
      router.query.page ||
      router.asPath.match(new RegExp(`[&?]page=(.*)(&|$)`));
    if (page == "practice") {
      setSelectedIndex(0);
    } else if (page == "ask-noora") {
      setSelectedIndex(1);
    } else if (!page) {
      router.push("/playground?page=practice", undefined, {
        shallow: true,
      }); // default if no path
    }
  }, [router.query]);

  // PRACTICE
  const [history, setHistory] = useState([]);
  const [convoState, setConvoState] = useState({
    draft: "",
    turn: "user-answer",
    modules: [
      { title: "general", active: true },
      { title: "work", active: true },
    ],
    sentiments: [
      { title: "positive", active: true },
      { title: "neutral", active: false },
      { title: "negative", active: true },
    ],
    model: {
      name: "text-davinci-002", // "curie:ft-open-virtual-assistant-lab-stanford:dataset-v5-model-v4-2022-07-12-23-12-49",
      temperature: 0.9,
      frequencyPenalty: 0.6,
      presencePenalty: 0.5,
      goodReplyThreshold: 0.5,
    },
    showTechnical: true,
    progress: [],
    numProblems: 5,
  });

  // ASK NOORA
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([
    {
      id: -1,
      statement: "I just finished a really good book!",
      explanation:
        "You should show me that you are interested in my experiences by asking me about my book.",
      reply: "That's great! What was your favorite part of the book?",
    },
  ]);

  const [resultsQueue, setResultsQueue] = useState<any[]>([]);

  const value = useMemo(
    () => ({
      practice: {
        history: {
          value: history,
          setValue: setHistory,
        },
        convoState: {
          value: convoState,
          setValue: setConvoState,
        },
      },
      askNoora: {
        query: {
          value: query,
          setValue: setQuery,
        },
        results: {
          value: results,
          setValue: setResults,
        },
        resultsQueue: {
          value: resultsQueue,
          setValue: setResultsQueue,
        },
      },
    }),
    [
      query,
      setQuery,
      results,
      setResults,
      resultsQueue,
      setResultsQueue,
      history,
      setHistory,
      convoState,
      setConvoState,
    ]
  );

  return (
    <PlaygroundContext.Provider value={value}>
      <div className="pt-16"></div>

      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List>
          <nav
            className="fixed w-screen z-20 flex divide-x divide-gray-200"
            aria-label="Tabs"
          >
            {["Practice", "Ask Noora"].map((title) => {
              let pageId = title.toLowerCase().replace(" ", "-");
              return (
                <Tab as={Fragment} key={title}>
                  {({ selected }) => (
                    <button
                      onClick={() => {
                        router.push("/playground?page=" + pageId, undefined, {
                          shallow: true,
                        });
                      }}
                      className={clsx(
                        "text-gray-900 group relative min-w-0 flex-1 overflow-hidden py-4 px-4 text-sm font-medium text-center focus:z-10",
                        selected ? "bg-gray-100" : "hover:bg-gray-50 bg-white"
                      )}
                    >
                      <span
                        className={clsx(
                          "text-lg",
                          selected
                            ? "text-noora-secondary-light font-bold"
                            : "text-gray-700"
                        )}
                      >
                        {title}
                      </span>
                      <span
                        aria-hidden={true}
                        className={clsx(
                          "absolute inset-x-0 bottom-0 h-1",
                          selected ? "bg-noora-secondary-light" : "bg-gray-300"
                        )}
                      />
                    </button>
                  )}
                </Tab>
              );
            })}
          </nav>
        </Tab.List>
        {router.query.page && (
          <Tab.Panels>
            <Tab.Panel>
              <Practice />
            </Tab.Panel>
            <Tab.Panel>
              <AskNooraPlayground />
            </Tab.Panel>
          </Tab.Panels>
        )}
        {!router.query.page && <div className="h-screen"></div>}
      </Tab.Group>
    </PlaygroundContext.Provider>
  );
}

export const PlaygroundContext = createContext<any>({});
