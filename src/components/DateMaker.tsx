import "../styles/DateMaker.css";

import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { MemoizedTemplateDrag } from "./TemplateDrag";
import TrashSharp from "react-ionicons/lib/TrashSharp";
import { DateForm } from "./DateForm";

import { useMediaQuery } from "react-responsive";

type DateMakerProps = {
  className: string;
};

export const DateMaker = ({ className }: DateMakerProps) => {
  const isFirstBreak = useMediaQuery({ query: "(min-width: 1350px)" });

  const [selectedKey, setSelectedKey] = useState("tasks");

  return (
    <div className={className}>
      <div className="gridThree px-4 pt-3 pb-2 mb-2">
        <MemoizedTemplateDrag
          id="t0"
          type="trash"
          className="m-auto"
          style={{
            height: "fit-content",
            width: "fit-content",
          }}
        >
          <TrashSharp color="white" width="1.5em" height="1.5em" />
          <h6 className="fontMini m-auto d-inline-block px-2">
            Drop here to delete
          </h6>
        </MemoizedTemplateDrag>
      </div>
      <Tabs
        defaultActiveKey="tasks fw-semibold"
        activeKey={selectedKey}
        id="fill-tab-example"
        fill
        className="gridOne fontMedium fw-semibold"
        onSelect={(key) => setSelectedKey(key!)}
      >
        <Tab className="w-100 h-100" eventKey="tasks" title="Tasks">
          <div className="w-100 h-100 tabDiv pb-4">
            <MemoizedTemplateDrag
              id="m0"
              type="maker"
              className={`gridm0 ${
                !isFirstBreak
                  ? "d-flex flex-column flex-wrap mx-2 overflow-x-auto overflow-y-hidden"
                  : "m-auto"
              }`}
              style={{
                minWidth: isFirstBreak ? "" : "100%",
                minHeight: isFirstBreak ? "100%" : "",
                height: isFirstBreak ? "fit-content" : "3.1em",
                width: isFirstBreak ? "3.1em" : "fit-content",
                alignContent: "flex-start",
              }}
              borderClick="#f2ae44"
              borderHighlight="#b52d5f"
            />
            {isFirstBreak && (
              <MemoizedTemplateDrag
                id="m1"
                type="maker"
                className="m-auto gridm1"
                style={{
                  minWidth: isFirstBreak ? "" : "100%",
                  minHeight: isFirstBreak ? "100%" : "",
                  height: "fit-content",
                  width: "6.1em",
                }}
                borderClick="#f2ae44"
                borderHighlight="#b52d5f"
              />
            )}
            <MemoizedTemplateDrag
              id="m2"
              type="maker"
              className={`gridm2 ${
                !isFirstBreak
                  ? "d-flex flex-column flex-wrap mx-2 ps-2 overflow-x-auto overflow-y-hidden"
                  : "m-auto"
              }`}
              style={{
                minWidth: isFirstBreak ? "" : "100%",
                minHeight: isFirstBreak ? "100%" : "",
                height: isFirstBreak ? "fit-content" : "6.1em",
                width: isFirstBreak ? "6.1em" : "fit-content",
                alignContent: "flex-start",
              }}
              borderClick="#f2ae44"
              borderHighlight="#b52d5f"
            />
          </div>
        </Tab>
        <Tab className="w-100 h-100" eventKey="createtask" title="Create Task">
          <DateForm setSelectedKey={setSelectedKey} />
        </Tab>
      </Tabs>
    </div>
  );
};

export const MemoizedDateMaker = React.memo(DateMaker);
